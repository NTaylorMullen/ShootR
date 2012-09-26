using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShootR
{
    public class QuadTreeNode
    {

        private const int TOP_LEFT = 0,
                          TOP_RIGHT = 1,
                          BOTTOM_LEFT = 2,
                          BOTTOM_RIGHT = 3;
        private bool _partitioned = false;
        private int _minWidth;
        private int _minHeight;

        public QuadTreeNode(Rectangle bound, int minWidth, int minHeight, QuadTreeNode parent)
        {
            Bounds = bound;
            _minWidth = minWidth;
            _minHeight = minHeight;
            Contents = new List<Collidable>();
            Children = new List<QuadTreeNode>(4);
            Parent = parent;
        }

        public Rectangle Bounds { get; set; }
        public List<Collidable> Contents { get; set; }
        public List<QuadTreeNode> Children { get; set; }
        public QuadTreeNode Parent { get; set; }
        public List<Collidable> GetSubTreeContents()
        {
            List<Collidable> results = new List<Collidable>();

            foreach (QuadTreeNode node in Children)
            {
                results.AddRange(node.GetSubTreeContents());
            }

            results.AddRange(this.Contents);
            return results;
        }

        public void Partition()
        {
            int partitionedWidth = Convert.ToInt32(Math.Round(Bounds.Width * .5)),
                partitionedHeight = Convert.ToInt32(Math.Round(Bounds.Height * .5));

            // If the partioned width or height is smaller than the minimum then do not partition
            if (partitionedWidth < _minWidth || partitionedHeight < _minHeight)
            {
                return;
            }

            Children.Add(new QuadTreeNode(new Rectangle(Bounds.X, Bounds.Y, partitionedWidth, partitionedHeight), _minWidth, _minHeight, this));
            Children.Add(new QuadTreeNode(new Rectangle(Bounds.X + partitionedWidth, Bounds.Y, partitionedWidth, partitionedHeight), _minWidth, _minHeight, this));
            Children.Add(new QuadTreeNode(new Rectangle(Bounds.X, Bounds.Y + partitionedHeight, partitionedWidth, partitionedHeight), _minWidth, _minHeight, this));
            Children.Add(new QuadTreeNode(new Rectangle(Bounds.X + partitionedWidth, Bounds.Y + partitionedHeight, partitionedWidth, partitionedHeight), _minWidth, _minHeight, this));
            _partitioned = true;
        }

        public void ReverseInsert(Collidable obj)
        {
            // Check if object has left the bounds of this node then go up another level
            if (!this.Bounds.Contains(obj.GetBounds()))
            {
                // NOTE: If you get an error here chances are an object is out of bounds. aka off the quad tree map.
                // In order to avoid an additional check we assume that the obj is smaller than
                // the root node.
                this.Parent.ReverseInsert(obj);
            }
            else
            {
                obj.SetMapArea(this);
                this.Contents.Add(obj);
            }
        }

        public void Insert(Collidable obj)
        {
            if (!_partitioned)
            {
                Partition();
            }

            foreach (QuadTreeNode node in Children)
            {
                if (node.Bounds.Contains(obj.GetBounds()))
                {
                    node.Insert(obj);
                    return;
                }
            }

            // When we get here we're then "this" is currently the largest node to fit our object OR
            // We're at a leaf node caused by the smallest possible partition width/height.
            Contents.Add(obj);
            obj.SetMapArea(this);
        }

        public List<Collidable> Query(Rectangle queryArea)
        {
            List<Collidable> results = new List<Collidable>();

            // Check if some of the items in this quadrant are partially contained within the query area
            foreach (Collidable item in this.Contents)
            {
                if (queryArea.IntersectsWith(item.GetBounds()))
                    results.Add(item);
            }

            foreach (QuadTreeNode node in Children)
            {
                // If "this" fully contains the query area then we need to
                // drill down until we find all of the query items
                if (node.Bounds.Contains(queryArea))
                {
                    results.AddRange(node.Query(queryArea));
                    break;
                }

                // If the queryArea fully contains the node then everything
                // underneath it belongs to the query
                if (queryArea.Contains(node.Bounds))
                {
                    results.AddRange(node.GetSubTreeContents());
                    continue;
                }

                // If a sub-node intersects partially with the query then we
                // need to query its children to find valid nodes
                if (node.Bounds.IntersectsWith(queryArea))
                {
                    results.AddRange(node.Query(queryArea));
                }
            }

            return results;
        }

        #region Children geters and seters

        public QuadTreeNode TopLeft
        {
            get
            {
                return Children[TOP_LEFT];
            }
            set
            {
                Children[TOP_LEFT] = value;
            }
        }

        public QuadTreeNode TopRight
        {
            get
            {
                return Children[TOP_RIGHT];
            }
            set
            {
                Children[TOP_RIGHT] = value;
            }
        }

        public QuadTreeNode BottomLeft
        {
            get
            {
                return Children[BOTTOM_LEFT];
            }
            set
            {
                Children[BOTTOM_LEFT] = value;
            }
        }

        public QuadTreeNode BottomRight
        {
            get
            {
                return Children[BOTTOM_RIGHT];
            }
            set
            {
                Children[BOTTOM_RIGHT] = value;
            }
        }

        #endregion

        public void ClearCollidableMaps()
        {
            // Clear each of the sub tree maps
            foreach (Collidable obj in GetSubTreeContents())
            {
                obj.ClearMapArea();
            }
        }

        public void UpdateObjects()
        {
            for (int i = 0; i < Contents.Count; i++)
            {
                if (!Contents[i].IsDisposed())
                {
                    if (UpdateObject(Contents[i])) // If the object moved nodes then we need to adjust i
                    {
                        i--;
                    }
                }
            }
        }

        /// <summary>
        /// Updates the object and returns whether it still belongs to this node
        /// </summary>
        /// <param name="obj">Object to Update in the quad tree</param>
        /// <returns>Whether the object moved</returns>
        private bool UpdateObject(Collidable obj)
        {
            obj.ClearMapArea();
            this.Contents.Remove(obj);

            // Check if object has left the bounds of this node
            if (!this.Bounds.Contains(obj.GetBounds()))
            {
                // We now belong to a parent
                this.Parent.ReverseInsert(obj);
                return true;
            }
            else // We're within the same node, but could be in children, must insert
            {
                this.Insert(obj);
                // If we didn't move quad tree nodes
                if (obj.GetMapArea() == this)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
        }
    }
}
