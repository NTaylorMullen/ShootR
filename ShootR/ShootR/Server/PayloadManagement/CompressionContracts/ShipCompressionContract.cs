namespace ShootR
{
    // Used to declare which sections of the array each piece of information resides in
    public class ShipCompressionContract
    {
        // NOTE: CollidableCompressionContrat base class takes up the first X integer array arguments        
        public short RotatingLeft = 15;
        public short RotatingRight = 16;
        public short Forward = 17;
        public short Backward = 18;
        public short Name = 19;
        public short MaxLife = 20;
        public short Level = 21;
        public short Boost = 22;
    }
}