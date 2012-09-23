using System.Collections.Generic;
using System.Drawing;

namespace ShootR
{
    public class QuadTree
    {
        QuadTreeNode _root;
        private int _width, _height, _minWidth, _minHeight;

        public QuadTree(int width, int height, int minWidth, int minHeight)
        {
            _width = width;
            _height = height;
            _minWidth = minWidth;
            _minHeight = minHeight;
            _root = new QuadTreeNode(new Rectangle(0, 0, _width, _height), _minWidth, _minHeight, null);
            _root.Partition();
        }

        public void Insert(Collidable obj)
        {
            _root.Insert(obj);
        }

        /// <summary>
        /// Will return all objects "underneath" (in the tree) the obj.
        /// Called partial because if an object "above" the obj is colliding
        /// with it this function will not return that object.  Therefore when
        /// calling this function be sure to traverse the whole collision list.
        /// </summary>
        /// <param name="obj">Object to check collisions</param>
        public List<Collidable> GetPartialCollisionCheckList(Collidable obj)
        {
            return obj.GetMapArea().GetSubTreeContents();
        }

        public List<Collidable> Query(Rectangle queryArea)
        {
            return _root.Query(queryArea);
        }

        public void Remove(Collidable obj)
        {
            QuadTreeNode node = obj.GetMapArea();
            if (node != null)
            {
                obj.GetMapArea().Contents.Remove(obj);
                obj.ClearMapArea();
            }
        }

        public void Clear()
        {
            _root.ClearCollidableMaps();
            _root = new QuadTreeNode(new Rectangle(0, 0, _width, _height), _minWidth, _minHeight, null);
        }

        public void Update()
        {
            List<Collidable> objects = _root.GetSubTreeContents();
            foreach (Collidable obj in objects)
            {
                obj.GetMapArea().UpdateObjects();
            }
        }
    }
}
