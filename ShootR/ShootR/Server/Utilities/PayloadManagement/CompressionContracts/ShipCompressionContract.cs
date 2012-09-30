namespace ShootR
{
    // Used to declare which sections of the array each piece of information resides in
    public class ShipCompressionContract
    {
        // NOTE: CollidableCompressionContrat base class takes up the first 12 integer array arguments
        public short RotatingLeft = 13;
        public short RotatingRight = 14;
        public short Forward = 15;
        public short Backward = 16;
        public short Name = 17;
    }
}