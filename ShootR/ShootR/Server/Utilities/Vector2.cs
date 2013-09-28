using System;

namespace ShootR
{
    public class Vector2
    {
        public Vector2()
        {
            X = 0;
            Y = 0;
        }

        public Vector2(double rotation)
        {
            double radians = rotation * Math.PI / 180;
            X = Math.Cos(radians);
            Y = Math.Sin(radians);
        }

        public Vector2(double x, double y)
        {
            X = x;
            Y = y;
        }

        public Vector2(int x, int y)
        {
            X = Convert.ToDouble(x);
            Y = Convert.ToDouble(y);
        }

        public Vector2(Vector2 v)
        {
            X = v.X;
            Y = v.Y;
        }

        public static Vector2 Zero
        {
            get
            {
                return new Vector2();
            }
        }

        public static Vector2 One
        {
            get
            {
                return new Vector2(1, 1);
            }
        }

        public double X { get; set; }
        public double Y { get; set; }

        public Vector2 Normalized()
        {
            double length = this.Length();
            return new Vector2(X / length, Y / length);
        }

        public double Length()
        {
            return Math.Sqrt(Math.Pow(X, 2) + Math.Pow(Y, 2));
        }

        public Vector2 Abs()
        {
            return new Vector2(Math.Abs(X), Math.Abs(Y));
        }

        public double DistanceTo(Vector2 to)
        {
            return Math.Sqrt(Math.Pow(to.X - X, 2) + Math.Pow(to.Y - Y, 2));
        }

        public Vector2 Clone()
        {
            return new Vector2(X, Y);
        }

        public static Vector2 operator *(Vector2 v1, Vector2 v2)
        {
            return new Vector2(v1.X * v2.X, v1.Y * v2.Y);
        }

        public static Vector2 operator *(Vector2 v1, double num)
        {
            return new Vector2(v1.X * num, v1.Y * num);
        }

        public static Vector2 operator *(double num, Vector2 v1)
        {
            return new Vector2(v1.X * num, v1.Y * num);
        }

        public static Vector2 operator /(Vector2 v1, Vector2 v2)
        {
            return new Vector2(v1.X / v2.X, v1.Y / v2.Y);
        }

        public static Vector2 operator /(Vector2 v1, double num)
        {
            return new Vector2(v1.X / num, v1.Y / num);
        }

        public static Vector2 operator /(double num, Vector2 v1)
        {
            return new Vector2(num / v1.X, num / v1.Y);
        }

        public static Vector2 operator +(Vector2 v1, Vector2 v2)
        {
            return new Vector2(v1.X + v2.X, v1.Y + v2.Y);
        }

        public static Vector2 operator +(Vector2 v1, double num)
        {
            return new Vector2(v1.X + num, v1.Y + num);
        }

        public static Vector2 operator +(double num, Vector2 v1)
        {
            return new Vector2(v1.X + num, v1.Y + num);
        }

        public static Vector2 operator -(Vector2 v1, Vector2 v2)
        {
            return new Vector2(v1.X - v2.X, v1.Y - v2.Y);
        }

        public static Vector2 operator -(Vector2 v1, double num)
        {
            return new Vector2(v1.X - num, v1.Y - num);
        }

        public static Vector2 operator -(double num, Vector2 v1)
        {
            return new Vector2(num - v1.X, num - v1.Y);
        }


        public override string ToString()
        {
            return "( " + X + " , " + Y + " )";
        }
    }
}