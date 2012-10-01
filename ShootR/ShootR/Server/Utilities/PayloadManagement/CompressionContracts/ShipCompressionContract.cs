namespace ShootR
{
    // Used to declare which sections of the array each piece of information resides in
    public class ShipCompressionContract
    {
        // NOTE: CollidableCompressionContrat base class takes up the first 12 integer array arguments
        public short RotatingLeft = 14;
        public short RotatingRight = 15;
        public short Forward = 16;
        public short Backward = 17;
        public short Name = 18;
    }
}