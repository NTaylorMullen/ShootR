namespace Shooter
{
    /// <summary>
    /// Used to represent a game screen.  In one case the BulletManager utilizes the GameScreen class to decide
    /// when to expire a bullet due to it being out of range.
    /// </summary>
    public class GameScreen
    {
        public GameScreen(double left, double top, double right, double bottom)
        {
            Left = left;
            Top = top;
            Right = right;
            Bottom = bottom;
        }

        public double Left { get; set; }
        public double Top { get; set; }
        public double Right { get; set; }
        public double Bottom { get; set; }
    }
}