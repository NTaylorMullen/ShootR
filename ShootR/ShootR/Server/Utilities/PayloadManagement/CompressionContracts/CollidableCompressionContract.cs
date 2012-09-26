using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    public class CollidableCompressionContract
    {
        // Number members
        public short Collided = 0;
        public short CollidedAtX = 1;
        public short CollidedAtY = 2;
        public short ForcesX = 3;
        public short ForcesY = 4;
        public short Mass = 5;        
        public short PositionX = 6;
        public short PositionY = 7;
        public short Rotation = 8;
        public short VelocityX = 9;
        public short VelocityY = 10;
    }
}