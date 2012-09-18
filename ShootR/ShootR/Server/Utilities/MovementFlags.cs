namespace ShootR
{
    /// <summary>
    /// Flags to show which way an object is moving.  It can be multile directions which is why this is not an enum.
    /// </summary>
    public class MovementFlags
    {
        public bool RotatingLeft { get; set; }
        public bool RotatingRight { get; set; }
        public bool Forward { get; set; }
        public bool Backward { get; set; }
    }
}