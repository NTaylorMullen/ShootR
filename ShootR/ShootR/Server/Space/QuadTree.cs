using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Threading;

namespace ShootR
{
    public class QuadTree
    {
        QuadTreeNode _root;
        private int _width, _height, _minWidth, _minHeight;
        private long _currentUpdateInterval = 0;

        public QuadTree(int width, int height, int minWidth, int minHeight)
        {
            _width = width;
            _height = height;
            _minWidth = minWidth;
            _minHeight = minHeight;
            MapBoundary = new Rectangle(0, 0, _width, _height);
            _root = new QuadTreeNode(MapBoundary, _minWidth, _minHeight, null);            
        }

        public Rectangle MapBoundary { get; set; }

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
            }
        }

        public void Clear()
        {
            _root.ClearCollidableMaps();
            MapBoundary = new Rectangle(0, 0, _width, _height);
            _root = new QuadTreeNode(MapBoundary, _minWidth, _minHeight, null);
        }

        // Expands by a multiple of 4
        public void ExpandTo(int newWidth, int newHeight, int newMinWidth, int newMinHeight)
        {
            // We will be larger, so we want to have larger min-width's
            _root.LiftLeafNodes(newMinWidth, newMinHeight);

            MapBoundary = new Rectangle(0,0,newWidth,newHeight);
            // Create larger quad tree map
            QuadTreeNode newRoot = new QuadTreeNode(MapBoundary,newMinWidth,newMinHeight,null);
            // Maybe fix in the future, newRoot generates a topLeft that will be replaced
            newRoot.TopLeft = _root;
            // Make old root a child
            _root.Parent = newRoot;
            // Assign a new root
            _root = newRoot;
        }

        public void Update()
        {
            List<Collidable> objects = _root.GetSubTreeContents();
            _currentUpdateInterval++;

            foreach (Collidable obj in objects)
            {
                try
                {
                    if (!obj.Disposed)
                    {
                        if (!Map.OnMap(obj))
                        {
                            obj.HandleOutOfBounds();
                        }

                        QuadTreeNode area = obj.GetMapArea();

                        if (area.UpdatedAtInterval != _currentUpdateInterval)
                        {
                            area.UpdatedAtInterval = _currentUpdateInterval;
                            area.UpdateObjects();
                        }
                    }
                }
                catch (Exception e)
                {
                    ErrorLog.Instance.Log(e, " Object Count: " + objects.Count + " Game Objects, Ship Count: " + Game.Instance.GameHandler.ShipCount() + " Bullet Count: " + Game.Instance.GameHandler.BulletManager.Bullets.Count + ".    |||| Object Data: (Type) = " + obj.GetType() + " Position: ( " + obj.MovementController.Position.X + ", " + obj.MovementController.Position.Y + " )  Alive: " + obj.LifeController.Alive);
                }
            }
        }
    }
}
