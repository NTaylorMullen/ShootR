namespace ShootR
{
    // Used to declare which sections of the array each piece of information resides in
    public class ShipCompressionContract
    {
        // NOTE: CollidableCompressionContrat base class takes up the first 10 integer array arguments
        public short RotatingLeft = 12;
        public short RotatingRight = 13;
        public short Forward = 14;
        public short Backward = 15;
        public short Name = 16;
    }
}