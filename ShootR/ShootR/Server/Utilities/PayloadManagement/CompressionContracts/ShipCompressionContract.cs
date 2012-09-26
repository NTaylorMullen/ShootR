using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShootR
{
    // Used to declare which sections of the array each piece of information resides in
    public class ShipCompressionContract
    {
        // Number members
        // NOTE: CollidableCompressionContrat base class takes up the first 10 integer array arguments
        public short RotatingLeft = 11;
        public short RotatingRight = 12;
        public short Forward = 13;
        public short Backward = 14;

        // String members
        public short Name = 0;
    }
}