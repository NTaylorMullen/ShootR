declare module EndGate {
    /**
    * Represents a Disposable object with a Dispose method.
    */
    interface IDisposable {
        /**
        * Disposes the object.  Dispose should only be called once.
        */
        Dispose(): void;
    }
}
declare module EndGate {
    /**
    * Represents an object that can be cloned.
    */
    interface ICloneable {
        /**
        * Duplicates the current element, returning a copy of itself.
        */
        Clone(): any;
    }
}
declare module EndGate {
    /**
    * Defines a time interval.
    */
    class TimeSpan implements EndGate.ICloneable {      
        /**
        * Creates a new instance of TimeSpan based on the provided milliseconds.
        * @param milliseconds Number of milliseconds.
        */
        constructor(milliseconds: number);
        /**
        * Creates a new instance of TimeSpan based on the provided milliseconds, seconds and minutes.
        * @param milliseconds Number of milliseconds.
        * @param seconds Number of seconds.
        */
        constructor(milliseconds: number, seconds: number);
        /**
        * Creates a new instance of TimeSpan based on the provided milliseconds, seconds and minutes.
        * @param milliseconds Number of milliseconds.
        * @param seconds Number of seconds.
        * @param minutes Number of minutes.
        */
        constructor(milliseconds: number, seconds: number, minutes: number);
        /**
        * Gets or sets the number of milliseconds the TimeSpan represents.
        */
        public Milliseconds : number;
        /**
        * Gets or sets the number of seconds the TimeSpan represents.
        */
        public Seconds : number;
        /**
        * Gets or sets the number of minutes the TimeSpan represents.
        */
        public Minutes : number;
        /**
        * Returns a TimeSpan that represents the addition of the current TimeSpan's milliseconds to the provided TimeSpan's milliseconds.
        * @param val The TimeSpan to add.
        */
        public Add(val: TimeSpan): TimeSpan;
        /**
        * Returns a TimeSpan that represents the addition of the current TimeSpan's milliseconds to the provided milliseconds.
        * @param val The number of milliseconds to add.
        */
        public Add(val: number): TimeSpan;
        /**
        * Returns a TimeSpan that represents the multiplication of the current TimeSpan's milliseconds by the provided TimeSpan's milliseconds.
        * @param val The TimeSpan to multiply.
        */
        public Multiply(val: TimeSpan): TimeSpan;
        /**
        * Returns a TimeSpan that represents the multiplication of the current TimeSpan's milliseconds by the provided milliseconds.
        * @param val The number of milliseconds to multiply.
        */
        public Multiply(val: number): TimeSpan;
        /**
        * Returns a TimeSpan that represents the subtraction of the current TimeSpan's milliseconds by the provided TimeSpan's milliseconds.
        * @param val The TimeSpan to subtract by.
        */
        public Subtract(val: TimeSpan): TimeSpan;
        /**
        * Returns a TimeSpan that represents the subtraction of the current TimeSpan's milliseconds by the provided milliseconds.
        * @param val The number of milliseconds to subtract by.
        */
        public Subtract(val: number): TimeSpan;
        /**
        * Returns a TimeSpan that represents the subtraction of the current TimeSpan's milliseconds from the provided TimeSpan's milliseconds.
        * @param val The TimeSpan to subtract from.
        */
        public SubtractFrom(val: TimeSpan): TimeSpan;
        /**
        * Returns a TimeSpan that represents the subtraction of the current TimeSpan's milliseconds from the provided milliseconds.
        * @param val The number of milliseconds to subtract from.
        */
        public SubtractFrom(val: number): TimeSpan;
        /**
        * Returns a TimeSpan that represents the division of the current TimeSpan's milliseconds by the provided TimeSpan's milliseconds.
        * @param val The TimeSpan to divide by.
        */
        public Divide(val: TimeSpan): TimeSpan;
        /**
        * Returns a TimeSpan that represents the division of the current TimeSpan's milliseconds by the provided milliseconds.
        * @param val The number of milliseconds to divide by.
        */
        public Divide(val: number): TimeSpan;
        /**
        * Returns a TimeSpan that represents the division of the current TimeSpan's milliseconds from the provided TimeSpan's milliseconds.
        * @param val The TimeSpan to divide from.
        */
        public DivideFrom(val: TimeSpan): TimeSpan;
        /**
        * Returns a TimeSpan that represents the division of the current TimeSpan's milliseconds from the provided milliseconds.
        * @param val The number of milliseconds to divide from.
        */
        public DivideFrom(val: number): TimeSpan;
        /**
        * Determines whether this TimeSpan represents the same amount of time as the provided TimeSpan.
        * @param timeSpan The TimeSpan to compare the current TimeSpan to.
        */
        public Equivalent(timeSpan: TimeSpan): boolean;
        /**
        * Returns a TimeSpan that represents the same time interval.
        */
        public Clone(): TimeSpan;
        /**
        * Overridden toString method to display TimeSpan in the ms:s:m format.
        */
        public toString(): string;
        /**
        * Returns a TimeSpan that represents the specified number of milliseconds.
        * @param val Number of milliseconds.
        */
        static FromMilliseconds(val: number): TimeSpan;
        /**
        * Returns a TimeSpan that represents the specified number of seconds.
        * @param val Number of seconds.
        */
        static FromSeconds(val: number): TimeSpan;
        /**
        * Returns a TimeSpan that represents the specified number of minutes.
        * @param val Number of minutes.
        */
        static FromMinutes(val: number): TimeSpan;
        /**
        * Returns a TimeSpan that represents the time between the two dates.
        * @param from The from date.
        * @param to The to date.
        */
        static DateSpan(from: Date, to: Date): TimeSpan;
        /**
        * Gets a TimeSpan that represents a 0 millisecond time interval.
        */
        static Zero : TimeSpan;
    }
}
declare module EndGate {
    /**
    * Defines a game time class that is used to manage update timing execution as well as total game time.
    */
    class GameTime {    
        /**
        * Creates a new instance of the GameTime object.
        */
        constructor();
        /**
        * Gets the elapsed time since the last update.
        */
        public Elapsed : EndGate.TimeSpan;
        /**
        * Gets the current date time at the start of the update.
        */
        public Now : Date;
        /**
        * Gets the total amount of time surpassed since construction.
        */
        public Total : EndGate.TimeSpan;
        /**
        * Updates the game time object.  Causes the gameTime to refresh all its components.
        */
        public Update(): void;
    }
}
declare module EndGate {
    /**
    * Represents an object that can be updated.
    */
    interface IUpdateable {
        /**
        * Updates the object.
        * @param gameTime The current game time object.
        */
        Update(gameTime: EndGate.GameTime): void;
    }
}
interface Math {
    roundTo(val?: number, decimals?: number): number;
}
declare module EndGate {
    /**
    * Defines a two dimensional vector object which specifies an X and Y.
    */
    class Vector2d implements EndGate.ICloneable { 
        /**
        * Gets or sets the X component of the vector.
        */
        public X: number;
        /**
        * Gets or sets the Y component of the vector.
        */
        public Y: number;
        /**
        * Creates a new instance of Vector2d with the X and Y components initialized to 0.
        */
        constructor();
        /**
        * Creates a new instance of Vector2d.
        * @param x Initial value of the X component of the Vector2d.
        * @param y Initial value of the Y component of the Vector2d.
        */
        constructor(x: number, y: number);
        /**
        * Returns a Vector2d with all its components set to zero.
        */
        static Zero : Vector2d;
        /**
        * Returns a Vector2d with all its components set to one.
        */
        static One : Vector2d;
        /**
        * Returns a Vector2d that's reflected over the normal.
        * @param normal The normal to reflect over.
        */
        public Reflect(normal: Vector2d): Vector2d;
        /**
        * Returns a Vector2d that represents the current Vector2d projected onto the provided Vector2d.
        * @param vector Source vector.
        */
        public ProjectOnto(vector: Vector2d): Vector2d;
        /**
        * Returns a Vector2d that represents the current Vector2d rotated around the provided point and angle.
        * @param point Point to rotate around.
        * @param angle How far to rotate around the point.
        */
        public RotateAround(point: Vector2d, angle: number): Vector2d;
        /**
        * Returns a Vector2d that represents the current Vector2d rotated around the provided point and angle.
        * @param point Point to rotate around.
        * @param angle How far to rotate around the point.
        * @param precision The precision of the resulting Vector2d's X and Y components.
        */
        public RotateAround(point: Vector2d, angle: number, precision: number): Vector2d;
        /**
        * Executes the action with the X and Y components of this Vector2d and sets the X and Y components to the corresponding return values.
        * @param action The function used to modify the X and Y components.
        */
        public Apply(action: (val: number) => number): void;
        /**
        * Executes the action with the X and Y components of this Vector2d.
        * @param action The function to pass the X and Y components to.
        */
        public Trigger(action: (val: number) => void): void;
        /**
        * Returns the current vector as a unit vector. The result is a vector one unit in length pointing in the same direction as the original vector.
        */
        public Normalized(): Vector2d;
        /**
        * Calculates the magnitude or length of the vector
        */
        public Magnitude(): number;
        /**
        * Calculates the length or magnitude of the vector
        */
        public Length(): number;
        /**
        * Calculates dot product.
        * @param vector Source vector.
        */
        public Dot(vector: Vector2d): number;
        /**
        * Returns a Vector2d that has the current Vector2d's X and Y components as positive values.
        */
        public Abs(): Vector2d;
        /**
        * Returns a Vector2d that has its X and Y components converted to -1, 0 or 1 depending on the current Vector2d's component values.
        */
        public Sign(): Vector2d;
        /**
        * Returns the unit vector of the current vector.
        */
        public Unit(): Vector2d;
        /**
        * Calculates the distance between the current vector and the provided one.
        */
        public Distance(vector: Vector2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of adding the X and Y of this Vector2d to the X and Y of the provided Vector2d.
        * @param val The Vector2d to add.
        */
        public Add(val: Vector2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of adding the X and Y of this Vector2d to the Width and Height of the provided Size2d.
        * @param val The Vector2d to add.
        */
        public Add(val: EndGate.Size2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of adding the X and Y of this Vector2d to the provided number.
        * @param val The number to add.
        */
        public Add(val: number): Vector2d;
        /**
        * Returns a Vector2d that is the result of multiplying the X and Y of this Vector2d by the X and Y of the provided Vector2d.
        * @param val The Vector2d to multiply.
        */
        public Multiply(val: Vector2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of multiplying the X and Y of this Vector2d by the Width and Height of the provided Size2d.
        * @param val The Vector2d to multiply.
        */
        public Multiply(val: EndGate.Size2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of multiplying the X and Y of this Vector2d by the provided number.
        * @param val The number to multiply.
        */
        public Multiply(val: number): Vector2d;
        /**
        * Returns a Vector2d that is the result of subtracting the X and Y of this Vector2d by the X and Y of the provided Vector2d.
        * @param val The Vector2d to subtract.
        */
        public Subtract(val: Vector2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of subtracting the X and Y of this Vector2d by the Width and Height of the provided Size2d.
        * @param val The Vector2d to subtract.
        */
        public Subtract(val: EndGate.Size2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of subtracting the X and Y of this Vector2d by the provided number.
        * @param val The number to subtract.
        */
        public Subtract(val: number): Vector2d;
        /**
        * Returns a Vector2d that is the result of subtracting the X and Y of this Vector2d from the X and Y of the provided Vector2d.
        * @param val The Vector2d to subtract from.
        */
        public SubtractFrom(val: Vector2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of subtracting the X and Y of this Vector2d from the Width and Height of the provided Size2d.
        * @param val The Vector2d to subtract from.
        */
        public SubtractFrom(val: EndGate.Size2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of subtracting the X and Y of this Vector2d from the provided number.
        * @param val The number to subtract from.
        */
        public SubtractFrom(val: number): Vector2d;
        /**
        * Returns a Vector2d that is the result of dividing the X and Y of this Vector2d by the X and Y of the provided Vector2d.
        * @param val The Vector2d to divide.
        */
        public Divide(val: Vector2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of dividing the X and Y of this Vector2d by the Width and Height of the provided Size2d.
        * @param val The Vector2d to divide.
        */
        public Divide(val: EndGate.Size2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of dividing the X and Y of this Vector2d by the provided number.
        * @param val The number to divide.
        */
        public Divide(val: number): Vector2d;
        /**
        * Returns a Vector2d that is the result of dividing the X and Y of this Vector2d from the X and Y of the provided Vector2d.
        * @param val The Vector2d to divide from.
        */
        public DivideFrom(val: Vector2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of dividing the X and Y of this Vector2d from the Width and Height of the provided Size2d.
        * @param val The Vector2d to divide from.
        */
        public DivideFrom(val: EndGate.Size2d): Vector2d;
        /**
        * Returns a Vector2d that is the result of dividing the X and Y of this Vector2d from the provided number.
        * @param val The number to divide from.
        */
        public DivideFrom(val: number): Vector2d;
        /**
        * Determines whether this Vector2d's X and Y components are zero.
        */
        public IsZero(): boolean;
        /**
        * Returns a Vector2d that is the negated version of this Vector2d.
        */
        public Negate(): Vector2d;
        /**
        * Determines whether this Vector2d has the same X and Y of the provided Vector2d.
        * @param vector The Vector2d to compare the current Vector2d to.
        */
        public Equivalent(vector: Vector2d): boolean;
        /**
        * Returns a Vector2d that has an identical X and Y component as the current Vector2d.
        */
        public Clone(): Vector2d;
        /**
        * Overridden toString method to display Vector2d in the (X, Y) format.
        */
        public toString(): string;
    }
}
declare module EndGate {
    /**
    * Defines a two dimensional size object which specifies a Width and Height.
    */
    class Size2d implements EndGate.ICloneable { 
        /**
        * Gets or sets the horizontal component of this Size structure.
        */
        public Width: number;
        /**
        * Gets or sets the vertical component of this Size structure.
        */
        public Height: number;
        /**
        * Creates a new instance of Size2d.
        * @param size Initial value of the Width and Height components of Size2d.
        */
        constructor(size: number);
        /**
        * Creates a new instance of Size2d.
        * @param width Initial value of the Width component of Size2d.
        * @param height Initial value of the Height component of Size2d.
        */
        constructor(width: number, height: number);
        /**
        * Returns a Size2d with all its components set to zero.
        */
        static Zero : Size2d;
        /**
        * Returns a Size2d with all its components set to one.
        */
        static One : Size2d;
        /**
        * Gets the radius that encompasses the two dimensional size of this Size2d.
        */
        public Radius : number;
        /**
        * Gets half of the Width component of this Size2d.
        */
        public HalfWidth : number;
        /**
        * Gets half of the Height component of this Size2d.
        */
        public HalfHeight : number;
        /**
        * Executes the action with the Width and Height of this Size2d and sets the Width and Height to the corresponding return values.
        * @param action The function used to modify the Width and Height.
        */
        public Apply(action: (val: number) => number): void;
        /**
        * Executes the action with the Width and Height of this Size2d.
        * @param action The function to pass the Width and Height components to.
        */
        public Trigger(action: (val: number) => void): void;
        /**
        * Returns a Size2d that is the result of adding the Width and Height of this Size2d to the Width and Height of a Size2d.
        * @param val The Size2d to add.
        */
        public Add(val: Size2d): Size2d;
        /**
        * Returns a Size2d that is the result of adding the Width and Height of this Size2d to the X and Y of a Vector2d.
        * @param val The Vector2d to add.
        */
        public Add(val: EndGate.Vector2d): Size2d;
        /**
        * Returns a Size2d that is the result of adding the Width and Height of this Size2d to a number.
        * @param val The number to add.
        */
        public Add(val: number): Size2d;
        /**
        * Returns a Size2d that is the result of multiplying the Width and Height of this Size2d by the Width and Height of a Size2d.
        * @param val The Size2d to multiply.
        */
        public Multiply(val: Size2d): Size2d;
        /**
        * Returns a Size2d that is the result of multiplying the Width and Height of this Size2d by the X and Y of a Vector2d.
        * @param val The Vector2d to multiply.
        */
        public Multiply(val: EndGate.Vector2d): Size2d;
        /**
        * Returns a Size2d that is the result of multiplying the Width and Height of this Size2d by a number.
        * @param val The number to multiply.
        */
        public Multiply(val: number): Size2d;
        /**
        * Returns a Size2d that is the result of subtracting the Width and Height of this Size2d by the Width and Height of a Size2d.
        * @param val The Size2d to subtract.
        */
        public Subtract(val: Size2d): Size2d;
        /**
        * Returns a Size2d that is the result of subtracting the Width and Height of this Size2d by the X and Y of a Vector2d.
        * @param val The Vector2d to subtract.
        */
        public Subtract(val: EndGate.Vector2d): Size2d;
        /**
        * Returns a Size2d that is the result of subtracting the Width and Height of this Size2d by a number.
        * @param val The number to subtract.
        */
        public Subtract(val: number): Size2d;
        /**
        * Returns a Size2d that is the result of subtracting the Width and Height of this Size2d from the Width and Height of a Size2d.
        * @param val The Size2d to subtract from.
        */
        public SubtractFrom(val: Size2d): Size2d;
        /**
        * Returns a Size2d that is the result of subtracting the Width and Height of this Size2d from the X and Y of a Vector2d.
        * @param val The Vector2d to subtract from.
        */
        public SubtractFrom(val: EndGate.Vector2d): Size2d;
        /**
        * Returns a Size2d that is the result of subtracting the Width and Height of this Size2d from a number.
        * @param val The number to subtract from.
        */
        public SubtractFrom(val: number): Size2d;
        /**
        * Returns a Size2d that is the result of dividing the Width and Height of this Size2d by the Width and Height of a Size2d.
        * @param val The Size2d to divide.
        */
        public Divide(val: Size2d): Size2d;
        /**
        * Returns a Size2d that is the result of dividing the Width and Height of this Size2d by the X and Y of a Vector2d.
        * @param val The Vector2d to divide.
        */
        public Divide(val: EndGate.Vector2d): Size2d;
        /**
        * Returns a Size2d that is the result of dividing the Width and Height of this Size2d by a number.
        * @param val The number to divide.
        */
        public Divide(val: number): Size2d;
        /**
        * Returns a Size2d that is the result of dividing the Width and Height of this Size2d from the Width and Height of a Size2d.
        * @param val The Size2d to divide from.
        */
        public DivideFrom(val: Size2d): Size2d;
        /**
        * Returns a Size2d that is the result of dividing the Width and Height of this Size2d from the X and Y of a Vector2d.
        * @param val The Vector2d to divide from.
        */
        public DivideFrom(val: EndGate.Vector2d): Size2d;
        /**
        * Returns a Size2d that is the result of dividing the Width and Height of this Size2d from a number.
        * @param val The number to divide from.
        */
        public DivideFrom(val: number): Size2d;
        /**
        * Returns a Size2d that is the negated version of this Size2d.
        */
        public Negate(): Size2d;
        /**
        * Determines whether this Size2d has the same Width and Height of another Size2d.
        * @param size The Size2d to compare the current Size2d to.
        */
        public Equivalent(size: Size2d): boolean;
        /**
        * Returns a Size2d that has identical Width's and Height's as the current Size2d.
        */
        public Clone(): Size2d;
        /**
        * Overridden toString method to display Size2d in the (Width, Height) format.
        */
        public toString(): string;
    }
}
declare module EndGate {
    /**
    * Represents an object that has a position and rotation.
    */
    interface IMoveable {
        /**
        * Gets or sets the location of the moveable object.
        */
        Position: EndGate.Vector2d;
        /**
        * Gets or sets the rotation of the moveable object.
        */
        Rotation: number;
    }
}
declare module EndGate.Bounds {
    /**
    * Defines a circle that can be used to detect intersections.
    */
    class BoundingCircle extends Bounds.Bounds2d {  
        /**
        * Gets or sets the Radius of the circle.
        */
        public Radius: number;
        /**
        * Creates a new instance of BoundingCircle.
        * @param position Initial Position of the BoundingCircle.
        * @param radius Initial Radius of the BoundingCircle.
        */
        constructor(position: EndGate.Vector2d, radius: number);
        /**
        * Scales the radius of the BoundingCircle.
        * @param scale Value to multiply the radius by.
        */
        public Scale(scale: number): void;
        /**
        * Calculates the area of the BoundingCircle.
        */
        public Area(): number;
        /**
        * Calculates the circumference of the BoundingCircle.
        */
        public Circumference(): number;
        /**
        * Determines if the current BoundingCircle is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public IntersectsCircle(circle: BoundingCircle): boolean;
        /**
        * Determines if the current BoundingCircle is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: Bounds.BoundingRectangle): boolean;
        /**
        * Determines if the current BoundingCircle contains the provided Vector2d.
        * @param point A point.
        */
        public ContainsPoint(point: EndGate.Vector2d): boolean;
        /**
        * Determines if the current BoundingCircle completely contains the provided BoundingCircle.
        * @param circle A circle to check containment on.
        */
        public ContainsCircle(circle: BoundingCircle): boolean;
        /**
        * Determines if the current BoundingCircle completely contains the provided BoundingRectangle.
        * @param rectangle A rectangle to check containment on.
        */
        public ContainsRectangle(rectangle: Bounds.BoundingRectangle): boolean;
    }
}
declare module EndGate.Bounds {
    /**
    * Defines a rectangle that can be used to detect intersections.
    */
    class BoundingRectangle extends Bounds.Bounds2d {  
        /**
        * Gets or sets the Size of the rectangle.
        */
        public Size: EndGate.Size2d;
        /**
        * Creates a new instance of BoundingRectangle.
        * @param position Initial Position of the BoundingRectangle.
        * @param size Initial Size of the BoundingRectangle.
        */
        constructor(position: EndGate.Vector2d, size: EndGate.Size2d);
        /**
        * Scales the width and height of the BoundingRectangle.
        * @param x Value to multiply the width by.
        * @param y Value to multiply the height by.
        */
        public Scale(x: number, y: number): void;
        /**
        * Gets the top left corner of the BoundingRectangle.
        */
        public TopLeft : EndGate.Vector2d;
        /**
        * Gets the top right corner of the BoundingRectangle.
        */
        public TopRight : EndGate.Vector2d;
        /**
        * Gets the bottom left corner of the BoundingRectangle.
        */
        public BotLeft : EndGate.Vector2d;
        /**
        * Gets the bottom right corner of the BoundingRectangle.
        */
        public BotRight : EndGate.Vector2d;
        /**
        * Returns a list of vertices that are the locations of each corner of the BoundingRectangle. Format: [TopLeft, TopRight, BotLeft, BotRight].
        */
        public Corners(): EndGate.Vector2d[];
        /**
        * Determines if the current BoundingRectangle is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public IntersectsCircle(circle: Bounds.BoundingCircle): boolean;
        /**
        * Determines if the current BoundingRectangle is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: BoundingRectangle): boolean;
        /**
        * Determines if the current BoundingRectangle contains the provided Vector2d.
        * @param point A point.
        */
        public ContainsPoint(point: EndGate.Vector2d): boolean;
        /**
        * Determines if the current BoundingRectangle completely contains the provided BoundingCircle.
        * @param circle A circle to check containment on.
        */
        public ContainsCircle(circle: Bounds.BoundingCircle): boolean;
        /**
        * Determines if the current BoundingCircle completely contains the provided BoundingRectangle.
        * @param rectangle A rectangle to check containment on.
        */
        public ContainsRectangle(rectangle: BoundingRectangle): boolean;
    }
}
declare module EndGate.Bounds {
    /**
    * Abstract bounds type that is used to detect intersections.
    */
    class Bounds2d implements EndGate.IMoveable { 
        /**
        * Gets or sets the Position of the bounds.
        */
        public Position: EndGate.Vector2d;
        /**
        * Gets or sets the Rotation of the bounds.
        */
        public Rotation: number;
        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current bounded object.
        */
        constructor(position: EndGate.Vector2d);
        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current bounded object.
        * @param rotation Initial Rotation of the current bounded object.
        */
        constructor(position: EndGate.Vector2d, rotation: number);
        /**
        * Abstract: Scales the size of the bounded object.
        * @param x Value to multiply the horizontal component by.
        * @param y Value to multiply the vertical component by.
        */
        public Scale(x: number, y: number): void;
        /**
        * Abstract: Determines if the current bounded object contains the provided Vector2d.
        * @param point A point.
        */
        public ContainsPoint(point: EndGate.Vector2d): boolean;
        /**
        * Abstract: Determines if the current bounded object completely contains the provided BoundingCircle.
        * @param circle A circle to check containment on.
        */
        public ContainsCircle(circle: Bounds.BoundingCircle): boolean;
        /**
        * Abstract: Determines if the current bounded object completely contains the provided BoundingRectangle.
        * @param rectangle A rectangle to check containment on.
        */
        public ContainsRectangle(rectangle: Bounds.BoundingRectangle): boolean;
        /**
        * Abstract: Determines if the current bounded object contains the provided Vector2d.
        * @param point A point to check containment on.
        */
        public Contains(point: EndGate.Vector2d): boolean;
        /**
        * Abstract: Determines if the current bounded object completely contains another bounded object.
        * @param obj A bounded object to check containment on.
        */
        public Contains(obj: Bounds2d): boolean;
        /**
        * Determines if the current bounded object intersects another bounded object.
        * @param obj Bounding object to check collision with.
        */
        public Intersects(obj: Bounds2d): boolean;
        /**
        * Abstract: Determines if the current bounded object is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public IntersectsCircle(circle: Bounds.BoundingCircle): boolean;
        /**
        * Abstract: Determines if the current bounded object is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: Bounds.BoundingRectangle): boolean;
    }
}
declare module EndGate.Rendering {
    /**
    * Represents a renderable object that can be drawn to a canvas.
    */
    interface IRenderable {
        /**
        * Gets or sets the ZIndex property.  The ZIndex is used to control draw order.  Higher ZIndexes appear above lower ZIndexed renderables.
        */
        ZIndex: number;
        /**
        * Gets or sets the Visible property.  The Visible property determines whether the renderable will be drawn to the game screen.
        */
        Visible: boolean;
        /**
        * Draws the renderable to the provided canvas context
        * @param context The canvas context to draw the renderable onto.
        */
        Draw(context: CanvasRenderingContext2D): void;
        /**
        * Returns the bounding area that represents where the renderable will draw.
        */
        GetDrawBounds(): EndGate.Bounds.Bounds2d;
    }
}
declare module EndGate {
    /**
    * Defines an event handler object that can maintain bound functions and trigger them on demand.
    */
    class EventHandler implements EndGate.IDisposable {  
        /**
        * Creates a new instance of the EventHandler object.
        */
        constructor();
        /**
        * Binds the provided action to the EventHandler.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler Trigger.
        */
        public Bind(action: Function): void;
        /**
        * Binds the provided action to the EventHandler for the specified number of triggers.  Once all triggers have been fired the EventHandler will unbind itself.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler Trigger.
        * @param triggerCount Number of triggers to wait before unbinding the action.
        */
        public BindFor(action: Function, triggerCount: number): void;
        /**
        * Unbinds the provided action from the EventHandler.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        public Unbind(action: Function): void;
        /**
        * Determines if the EventHandler has active bindings.
        */
        public HasBindings(): boolean;
        /**
        * Executes all bound functions and passes the provided args to each.
        */
        public Trigger(): void;
        /**
        * Disposes the event handler and unbinds all bound events.
        */
        public Dispose(): void;
    }
}
declare module EndGate.Collision {
    /**
    * Defines a CollisionConfiguration object that is used to configure and optimize the collision manager.
    */
    class CollisionConfiguration {   
        constructor(initialQuadTreeSize: EndGate.Size2d); 
        /**
        * Gets or sets the minimum quad tree node size.  For best performance this value should be equivalent to the smallest collidable object that will be monitored by the CollisionManager.  Changing this value re-creates the collision manager.  Values must represent a square.
        */
        public MinQuadTreeNodeSize : EndGate.Size2d;
        /**
        * Gets or sets the initial quad tree size.  The quad tree used for collision detection will dynamically grow in size if items drift outside of its boundaries.  If this property is set it will re-instantiate a new quad tree.  Values must be divisible by the MinQuadTreeNodeSize and must represent a square.
        */
        public InitialQuadTreeSize : EndGate.Size2d;
    }
}
declare module EndGate {
    /**
    * Defines a GameConfiguration object that is used to represent the current state of a Game object.
    */
    class GameConfiguration {
        /**
        * Indicates whether the game will only draw after an update.  If there are graphic modifications outside of the game update loop this should be set to 'false' to ensure the latest data is always drawn to the game screen.
        */
        public DrawOnlyAfterUpdate: boolean;    
        /**
        * Creates a new instance of the GameConfiguration object.
        * @param updateRateSetter A function that updates the rate of "Update" execution.
        */
        constructor(updateRateSetter: (updateRate: number) => void, initialQuadTreeSize: EndGate.Size2d);
        /**
        * Gets or sets the UpdateRate of the game.  Update rates are represented as X many updates per second.
        */
        public UpdateRate : number;
        /**
        * Gets the CollisionConfiguration of the game.  These configurations are used to optimize the collision management performance.
        */
        public CollisionConfiguration : EndGate.Collision.CollisionConfiguration;
    }
}
declare module EndGate {
    /**
    * Defines a type constrained event handler object that can maintain bound functions which take in a value T and trigger them on demand.
    */
    class EventHandler1<T> implements EndGate.IDisposable {  
        /**
        * Creates a new instance of the EventHandler object.
        */
        constructor();
        /**
        * Binds the provided action to the EventHandler1.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler Trigger.
        */
        public Bind(action: (val: T) => any): void;
        /**
        * Binds the provided action to the EventHandler1 for the specified number of triggers.  Once all triggers have been fired the action will unbind itself.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler Trigger.
        * @param triggerCount Number of triggers to wait before unbinding the action.
        */
        public BindFor(action: (val: T) => any, triggerCount: number): void;
        /**
        * Unbinds the provided action from the EventHandler1.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        public Unbind(action: (val: T) => any): void;
        /**
        * Determines if the EventHandler1 has active bindings.
        */
        public HasBindings(): boolean;
        /**
        * Executes all bound functions and passes the provided args to each.
        * @param val The argument to pass to the bound functions.
        */
        public Trigger(val: T): void;
        /**
        * Disposes the event handler and unbinds all bound events.
        */
        public Dispose(): void;
    }
}
declare module EndGate.Collision {
    /**
    * Defines a data object that is used to describe a collision event.
    */
    class CollisionData {
        /**
        * Who collided with you.
        */
        public With: Collision.Collidable;
        /**
        * Creates a new instance of the CollisionData object.
        * @param w Initial value of the With component of CollisionData.
        */
        constructor(w: Collision.Collidable);
    }
}
declare module EndGate.Collision {
    /**
    * Defines a collidable object that can be used to detect collisions with other objects.
    */
    class Collidable implements EndGate.IDisposable {  
        /**
        * Gets or sets the Bounds of the collidable.
        */
        public Bounds: EndGate.Bounds.Bounds2d;    
        /**
        * Creates a new instance of Collidable.
        * @param bounds Initial bounds for the Collidable.
        */
        constructor(bounds: EndGate.Bounds.Bounds2d);
        /**
        * Gets an event that is triggered when a collision happens.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnCollision : EndGate.EventHandler1<Collision.CollisionData>;
        /**
        * Gets an event that is triggered when the Collidable has been disposed.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnDisposed : EndGate.EventHandler1<Collidable>;
        /**
        * Determines if the provided collidable is colliding with this Collidable.
        * @param other Collidable to check collision with.
        */
        public IsCollidingWith(other: Collidable): boolean;
        /**
        * Triggers the OnCollision event.  Can also be overridden from derived classes to be called when a collision occurs if the collidable is being used with a CollisionManager
        * @param data Collision information related to the collision.
        */
        public Collided(data: Collision.CollisionData): void;
        /**
        * Triggers the OnDisposed event.  If this Collidable is used with a CollisionManager it will be unmonitored when disposed.
        */
        public Dispose(): void;
    }
}
declare module EndGate {
    /**
    * Defines a type constrained event handler object that can maintain bound functions which take in a value T and U and trigger them on demand.
    */
    class EventHandler2<T, U> implements EndGate.IDisposable {  
        /**
        * Creates a new instance of the EventHandler2 object.
        */
        constructor();
        /**
        * Binds the provided action to the EventHandler2.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler2 Trigger.
        */
        public Bind(action: (val1: T, val2: U) => any): void;
        /**
        * Binds the provided action to the EventHandler2 for the specified number of triggers.  Once all triggers have been fired the action will unbind itself.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler2 Trigger.
        * @param triggerCount Number of triggers to wait before unbinding the action.
        */
        public BindFor(action: (val1: T, val2: U) => any, triggerCount: number): void;
        /**
        * Unbinds the provided action from the EventHandler2.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        public Unbind(action: (val1: T, val2: U) => any): void;
        /**
        * Determines if the EventHandler2 has active bindings.
        */
        public HasBindings(): boolean;
        /**
        * Executes all bound functions and passes the provided args to each.
        * @param val1 The first argument to pass to the bound functions.
        * @param val2 The second argument to pass to the bound functions.
        */
        public Trigger(val1: T, val2: U): void;
        /**
        * Disposes the event handler and unbinds all bound events.
        */
        public Dispose(): void;
    }
}
declare module EndGate.Collision {
    /**
    * Defines a manager that will check for collisions between objects that it is monitoring.
    */
    class CollisionManager implements EndGate.IUpdateable, EndGate.IDisposable {       
        /**
        * Creates a new instance of CollisionManager.
        */
        constructor(configuration: Collision.CollisionConfiguration);
        /**
        * Gets an event that is triggered when a collision happens among two of the monitored objects.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnCollision : EndGate.EventHandler2<Collision.Collidable, Collision.Collidable>;
        /**
        * Monitors the provided collidable and will trigger its Collided function and OnCollision event whenever a collision occurs with it and another Collidable.
        * If the provided collidable gets disposed it will automatically become unmonitored.
        * @param obj Collidable to monitor.
        */
        public Monitor(obj: Collision.Collidable): void;
        /**
        * Monitors the provided collidable and will trigger its Collided function and OnCollision event whenever a collision occurs with it and another Collidable.
        * If the provided collidable gets disposed it will automatically become unmonitored.
        * Note: staticPosition'd collidable's will not collide with each other.
        * @param obj Collidable to monitor.
        * @param staticPosition Whether the Collidable will be stationary.  This value defaults to false.
        */
        public Monitor(obj: Collision.Collidable, staticPosition: boolean): void;
        /**
        * Unmonitors the provided collidable.  The Collided function and OnCollision event will no longer be triggered when an actual collision may have occurred.
        * Disposing a monitored collidable will automatically be unmonitored
        * @param obj Collidable to unmonitor.
        */
        public Unmonitor(obj: Collision.Collidable): void;
        /**
        * Checks for collisions within its monitored objects.  Games CollisionManager's automatically have their Update functions called at the beginning of each update loop.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: EndGate.GameTime): void;
        /**
        * Destroys removes all monitored collidables and destroys the collision manager.
        */
        public Dispose(): void; 
    }
}
declare module EndGate.Graphics {
    /**
    * Abstract drawable graphic type that is used create the base for graphics.
    */
    class Graphic2d implements EndGate.Rendering.IRenderable, EndGate.IMoveable, EndGate.IDisposable, EndGate.ICloneable { 
        /**
        * Gets or sets the ZIndex of the Graphic2d.  The ZIndex is used to control draw order.  Higher ZIndexes appear above lower ZIndexed graphics.
        */
        public ZIndex: number;
        /**
        * Gets or sets the Visible property.  The Visible property determines whether the renderable will be drawn to the game screen.
        */
        public Visible: boolean;
        /**
        * Gets or sets the Position of the Graphic2d.  The Position determines where the graphic will be drawn on the screen.
        */
        public Position: EndGate.Vector2d;
        /**
        * Gets or sets the Rotation of the Graphic2d..
        */
        public Rotation: number;
        /**
        * Gets the parent of the Graphic2d.  Value is null if no parent exists.
        */
        public Parent: Graphic2d;      
        /**
        * Creates a new instance of the Graphic2d object.  Should only ever be called by a derived class.
        * @param position The initial position of the Graphic2d
        */
        constructor(position: EndGate.Vector2d);
        /**
        * Gets the absolute position of the Graphic2d.  This is used to calculate absolute positions when graphic's have parents.
        */
        public AbsolutePosition : EndGate.Vector2d;
        /**
        * Gets an event that is triggered when the Graphic2d has been disposed.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnDisposed : EndGate.EventHandler1<Graphic2d>;
        /**
        * Gets or sets the current opacity.  Value is between 0 and 1.
        */
        public Opacity : number;
        /**
        * Returns the list of children for the current Graphic2d.
        */
        public GetChildren(): Graphic2d[];
        /**
        * Adds a child to the Graphic2d.  Children are drawn with relative positions to the parent Graphic2d.  Children
        * of a Graphic2d should not be added to the Scene, parent Graphic2d's are responsible for drawing their children.
        * @param graphic Child to add.
        */
        public AddChild(graphic: Graphic2d): void;
        /**
        * Removes a child from the Graphic2d.  Returns a Boolean value indicating whether or not the child was able to be removed.
        * @param graphic Child to remove.
        */
        public RemoveChild(graphic: Graphic2d): boolean;  
        /**
        * Abstract: Should be overridden to draw the derived class onto the context.  If this graphic is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the graphic onto.
        */
        public Draw(context: CanvasRenderingContext2D): void;
        /**
        * Abstract: Should be overridden to return the bounding area that represents where the graphic will draw.
        */
        public GetDrawBounds(): EndGate.Bounds.Bounds2d;
        /**
        * Abstract: Should be overridden to scale the size of the Graphic2d.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void;
        /**
        * Abstract: Returns a nearly identical copy of this Graphic2d.  If this Graphic2d belongs to a parent, the cloned Graphic2d will not. If this Graphic2d has children, all children will be cloned as well.  Lastly, the cloned Graphic2d will not have the same event bindings as this one does.
        */
        public Clone(): Graphic2d; 
        /**
        * Triggers the OnDisposed event.  If this Graphic2d is used with a Scene2d it will be removed from the scene when disposed.
        */
        public Dispose(): void;
    }
}
declare module EndGate.Rendering {
    /**
    * Defines a camera that is used to define a viewport.  Should be used in conjunction with a Camera2dRenderer to render graphics as if being viewed through a camera.
    */
    class Camera2d extends EndGate.Bounds.BoundingRectangle {
        /**
        *  The distance in which the Camera2d will default to and the distance that defines the 100% scale value.
        */
        static DefaultDistance: number; 
        /**
        * Gets or sets the camera distance.  This represents how far away the Camera is from the game canvas.  0 is directly on top of the canvas while DefaultDistance represents 100% scale.
        */
        public Distance: number;
        /**
        * Creates a new instance of the Camera2d object.
        * @param position Initial position of the camera.
        * @param size Initial size of the camera.
        */
        constructor(position: EndGate.Vector2d, size: EndGate.Size2d);
        /**
        * Converts an absolute position (0 to cameras Size) to a camera relative position.  Most useful when used to convert mouse click coordinates to scene coordinates.
        * @param position The absolute position to convert.  0 position represents the top or left hand side of the camera.
        */
        public ToCameraRelative(position: EndGate.Vector2d): EndGate.Vector2d;  
    }
}
declare module EndGate.Rendering {
    /**
    * Defines a 2d renderer that uses a double buffer to draw graphics.
    */
    class Renderer2d implements EndGate.IDisposable {       
        /**
        * Creates a new instance of the Renderer2d object.
        * @param renderOnto The canvas to render onto.
        */
        constructor(renderOnto: HTMLCanvasElement);
        /**
        * Gets an event that is triggered when the renderOnto canvas changes size.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnRendererSizeChange : EndGate.EventHandler1<EndGate.Size2d>;
        /**
        * Renders the provided renderables onto the renderOnto canvas.  Returns the canvas that was rendered onto.
        * @param renderables Array of items that are to be rendered, assumes Visible is set to true.
        */
        public Render(renderables: Rendering.IRenderable[]): CanvasRenderingContext2D;
        /**
        * Destroys the visible canvas.
        */
        public Dispose(): void;  
    }
}
declare module EndGate.Rendering {
    /**
    * Defines a camera rendering object that when used in conjunction with a Camera2d draws all objects in a camera relative position.
    */
    class Camera2dRenderer extends Rendering.Renderer2d {  
        /**
        * Creates a new instance of the Camera2dRenderer.
        * @param renderOnto The canvas to render onto.
        * @param camera The camera that ultimately decides what is drawn to the renderOnto canvas.
        */
        constructor(renderOnto: HTMLCanvasElement, camera: Rendering.Camera2d);
        /**
        * Renders the provided renderables onto the renderOnto canvas.  Returns the canvas that was rendered onto.
        * @param renderables Array of items that are to be rendered.
        */
        public Render(renderables: Rendering.IRenderable[]): CanvasRenderingContext2D;  
    }
}
declare module EndGate.Rendering {
    /**
    * Defines a scene object that is used to maintain a list of renderable objects that are rendered onto a joint game area.
    */
    class Scene2d implements EndGate.IDisposable {       
        /**
        * Creates a new instance of the Scene2d object.  The game canvas is created and appended to the HTML body to fill the screen.
        */
        constructor();
        /**
        * Creates a new instance of the Scene2d object.  The game canvas is created and appended to the HTML body to fill the screen.
        * @param onDraw Callback to execute whenever the Scene's draw is triggered.
        */
        constructor(onDraw: (context: CanvasRenderingContext2D) => void);
        /**
        * Creates a new instance of the Scene2d object.
        * @param onDraw Callback to execute whenever the Scene's draw is triggered.
        * @param drawArea The game canvas to draw onto.
        */
        constructor(onDraw: (context: CanvasRenderingContext2D) => void, drawArea: HTMLCanvasElement);
        /**
        * Gets the canvas that the Scene2d uses as its game area.
        */
        public DrawArea : HTMLCanvasElement;
        /**
        * Gets the game camera.
        */
        public Camera : Rendering.Camera2d;
        /**
        * Adds an actor to the scene.  All actors added to the scene have their Draw function called automatically.
        * @param actor The graphic to add to the scene.
        */
        public Add(actor: EndGate.Graphics.Graphic2d): void;
        /**
        * Removes an actor from the scene.  The actor will no longer have its Draw called.
        * @param actor The graphic to remove from the scene.
        */
        public Remove(actor: EndGate.Graphics.Graphic2d): void;
        /**
        * Draws all actors within the Scene and triggers the Scene2d's onDraw callback.
        */
        public Draw(): void;
        /**
        * Destroys the game canvas and clears the Scene2d's actors.
        */
        public Dispose(): void; 
    }
}
declare module EndGate.Input {
    /**
    * Represents a mouse event being triggered on the Game area.
    */
    interface IMouseEvent {
        /**
        * The location of the mouse relative to the game area.
        */
        Position: EndGate.Vector2d;
    }
}
declare module EndGate.Input {
    /**
    * Represents a mouse click event being triggered on the Game area.
    */
    interface IMouseClickEvent extends Input.IMouseEvent {
        /**
        * The mouse button that was clicked. Values can be "Left", "Right", or "Middle".
        */
        Button: string;
    }
}
declare module EndGate.Input {
    /**
    * Represents a mouse scroll event being triggered on the Game area.
    */
    interface IMouseScrollEvent extends Input.IMouseEvent {
        /**
        * The scroll direction. The Vector2d will contain 1, -1, or 0 values depending on the mouse scroll.
        */
        Direction: EndGate.Vector2d;
    }
}
declare module EndGate.Input {
    /**
    * Defines a handler that will monitor mouse events over a specified area and will execute appropriate functions based on the events.
    */
    class MouseHandler implements EndGate.IDisposable { 
        /**
        * Creates a new instance of the MouseHandler object.
        * @param target The object to monitor mouse events for.
        */
        constructor(target: HTMLElement);
        /**
        * Indicates if the left mouse button is down
        */
        public LeftIsDown : boolean;
        /**
        * Indicates if the middle mouse button is down
        */
        public MiddleIsDown : boolean;
        /**
        * Indicates if the right mouse button is down
        */
        public RightIsDown : boolean;
        /**
        * Indicates if any mouse button is down.
        */
        public IsDown : boolean;
        /**
        * Gets an event that is triggered when a mouse click occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnClick : EndGate.EventHandler1<Input.IMouseClickEvent>;
        /**
        * Gets an event that is triggered when a mouse double click occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnDoubleClick : EndGate.EventHandler1<Input.IMouseClickEvent>;
        /**
        * Gets an event that is triggered when a mouse down event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnDown : EndGate.EventHandler1<Input.IMouseClickEvent>;
        /**
        * Gets an event that is triggered when a mouse up event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnUp : EndGate.EventHandler1<Input.IMouseClickEvent>;
        /**
        * Gets an event that is triggered when a mouse move event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnMove : EndGate.EventHandler1<Input.IMouseEvent>;
        /**
        * Gets an event that is triggered when a mouse scroll event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnScroll : EndGate.EventHandler1<Input.IMouseScrollEvent>;
        /**
        * Disposes the MouseHandler and unbinds all bound events.
        */
        public Dispose(): void;         
    }
}
declare module EndGate.Input.Assets {
    /**
    * Defines an object that is used to represent a keyboard modifier state to determine if Ctrl, Alt, or Shift is being pressed.
    */
    class KeyboardModifiers {
        /**
        * Gets or sets the Ctrl component.  Represents if a Ctrl key is down.
        */
        public Ctrl: boolean;
        /**
        * Gets or sets the Alt component.  Represents if an Alt key is down.
        */
        public Alt: boolean;
        /**
        * Gets or sets the Shift component.  Represents if a Shift key is down.
        */
        public Shift: boolean;
        /**
        * Creates a new instance of the KeyboardModifiers object.
        * @param ctrl The initial value of the Ctrl component.
        * @param alt The initial value of the Alt component.
        * @param shift The initial value of the Shift component.
        */
        constructor(ctrl: boolean, alt: boolean, shift: boolean);
        /**
        * Determines whether this KeyboardModifiers object has the same ctrl, alt, and shift states as the provided KeyboardModifiers.
        * @param modifier The KeyboardModifiers to compare the current modifiers to.
        */
        public Equivalent(modifier: KeyboardModifiers): boolean;
        /**
        * Builds a KeyboardModifiers object to represent the state of an expected keyCommand
        * @param keyCommand The command to analyze.
        */
        static BuildFromCommandString(keyCommand: string): KeyboardModifiers;
    }
}
declare module EndGate.Input {
    /**
    * Defines a KeyboardCommandEvent object that represents when a command has been attempted.
    */
    class KeyboardCommandEvent {
        /**
        * The key that was hit.
        */
        public Key: string;
        /**
        * The modifier status.
        */
        public Modifiers: Input.Assets.KeyboardModifiers;
        /**
        * Creates a new instance of the KeyboardCommandEvent object.
        * @param keyEvent The raw key event from the DOM.
        */
        constructor(keyEvent: KeyboardEvent);
        /**
        * Determines if the KeyboardCommand matches the KeyboardCommandEvent
        * @param command The KeyboardCommand to check.
        */
        public Matches(command: Input.Assets.KeyboardCommand): boolean;
    }
}
declare module EndGate.Input.Assets {
    /**
    * Defines a class that is used to represent a keyboard command.
    */
    class KeyboardCommand implements EndGate.IDisposable {
        /**
        * Gets or sets the Key that is required to trigger the Action.
        */
        public Key: string;
        /**
        * Gets or sets the Action that is triggered when the KeyboardCommand has been successfully executed.
        */
        public Action: Function;
        /**
        * Gets or sets the Modifiers that are required to trigger the Action.
        */
        public Modifiers: Assets.KeyboardModifiers;  
        /**
        * Creates a new instance of the KeyboardCommand object.
        * @param command Initial command required to trigger the action function.
        * @param action Initial action to be triggered when the command is executed..
        */
        constructor(command: string, action: Function);
        /**
        * Gets an event that is triggered when a KeyboardCommand has been disposed.  If this KeyboardCommand is used with a KeyboardHandler it will no longer trigger the Action function.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnDispose : EndGate.EventHandler;
        /**
        * Triggers the OnDisposed event.  If this KeyboardCommand is used with a KeyboardHandler it will no longer trigger the Action function.
        */
        public Dispose(): void;
    }
}
declare module EndGate.Input {
    /**
    * Defines a handler that will check for keyboard commands and execute appropriate functions.
    */
    class KeyboardHandler implements EndGate.IDisposable {            
        /**
        * Creates a new instance of the KeyboardHandler object.
        */
        constructor();
        /**
        * Gets an event that is triggered when any key press occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnKeyPress : EndGate.EventHandler1<Input.KeyboardCommandEvent>;
        /**
        *Gets an event that is triggered when any key goes down.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnKeyDown : EndGate.EventHandler1<Input.KeyboardCommandEvent>;
        /**
        * Gets an event that is triggered when any key comes up.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnKeyUp : EndGate.EventHandler1<Input.KeyboardCommandEvent>;
        /**
        * Binds function to be called when the keyCommand is pressed.  To unbind the function, dispose of the returned KeyboardCommand.
        * @param keyCommand The command string required to execute the action.
        * @param action The action to execute when the keyCommand has been pressed.
        */
        public OnCommandPress(keyCommand: string, action: Function): Input.Assets.KeyboardCommand;
        /**
        * Binds function to be called when the keyCommand goes down.  To unbind the function, dispose of the returned KeyboardCommand.
        * @param keyCommand The command string required to execute the action.
        * @param action The action to execute when the keyCommand has is down.
        */
        public OnCommandDown(keyCommand: string, action: Function): Input.Assets.KeyboardCommand;
        /**
        * Binds function to be called when the keyCommand comes up.  To unbind the function, dispose of the returned KeyboardCommand.
        * @param keyCommand The command string required to execute the action.
        * @param action The action to execute when the keyCommand comes up.
        */
        public OnCommandUp(keyCommand: string, action: Function): Input.Assets.KeyboardCommand;
        /**
        * Disposes the KeyboardHandler and unbinds all bound events.
        */
        public Dispose(): void;     
    }
}
declare module EndGate.Input {
    /**
    * Defines an all around Input handler which manages mouse and keyboard events.
    */
    class InputManager implements EndGate.IDisposable {
        /**
        * Used to bind functions to mouse related events.
        */
        public Mouse: Input.MouseHandler;
        /**
        * Used to bind functions to keyboard related events.
        */
        public Keyboard: Input.KeyboardHandler; 
        /**
        * Creates a new instance of the InputManager object.
        * @param target The object through which mouse events will be monitored on.
        */
        constructor(target: HTMLElement);
        /**
        * Disposes the MouseHandler and unbinds all bound events.
        */
        public Dispose(): void;
    }
}
declare module EndGate.Graphics {
    /**
    * Defines an image resource that can be used within Sprite's, SpriteAnimation's and other drawable graphics.
    */
    class ImageSource implements EndGate.IDisposable, EndGate.ICloneable {
        /**
        * Gets or sets the ClipLocation.  Represents where the image clip is within the base image.
        */
        public ClipLocation: EndGate.Vector2d;
        /**
        * Gets or sets the ClipSize.  Represents how large the image clip is within the base image.
        */
        public ClipSize: EndGate.Size2d;
        /**
        * Gets the base image source.  Should not be modified once the ImageSource has been constructed
        */
        public Source: HTMLImageElement;     
        /**
        * Creates a new instance of the ImageSource object with a pre-loaded image object.
        * @param image Image object to use as the source.
        */
        constructor(image: HTMLImageElement);
        /**
        * Creates a new instance of the ImageSource object.
        * @param imageLocation Image source url (this cannot change after construction).
        */
        constructor(imageLocation: string);
        /**
        * Creates a new instance of the ImageSource object with a specified width and height.  ClipSize defaults to the full size and the ClipLocation defaults to (0,0). If width and height are not equal to the actual width and height of the image source the image will be stretched
        * @param imageLocation Image source url (this cannot change after construction).
        * @param width The width of the base image (this cannot change after construction).
        * @param height The height of the base image (this cannot change after construction).
        */
        constructor(imageLocation: string, width: number, height: number);
        /**
        * Creates a new instance of the ImageSource object with a specified width and height and a clip location.  If width and height are smaller than the actual width and height of the image source the image will be stretched
        * @param image Image object to use as the source.
        * @param clipX The horizontal location of the clip.
        * @param clipY The vertical location of the clip.
        * @param clipWidth The width of the clip.  Ultimately this width is the width that is drawn to the screen.
        * @param clipHeight The height of the clip.  Ultimately this height is the height that is drawn to the screen.
        */
        constructor(image: HTMLImageElement, clipX: number, clipY: number, clipWidth: number, clipHeight: number);
        /**
        * Creates a new instance of the ImageSource object with a specified width and height and a clip location.  If width and height are smaller than the actual width and height of the image source the image will be stretched
        * @param imageLocation Image source url (this cannot change after construction).
        * @param width The width of the base image (this cannot change after construction).
        * @param height The height of the base image (this cannot change after construction).
        * @param clipX The horizontal location of the clip.
        * @param clipY The vertical location of the clip.
        * @param clipWidth The width of the clip.  Ultimately this width is the width that is drawn to the screen.
        * @param clipHeight The height of the clip.  Ultimately this height is the height that is drawn to the screen.
        */
        constructor(imageLocation: string, width: number, height: number, clipX: number, clipY: number, clipWidth: number, clipHeight: number);
        /**
        * Gets an event that is triggered when the base image is finished loading.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnLoaded : EndGate.EventHandler1<ImageSource>;
        /**
        * Returns the base Size of the image source.
        */
        public Size : EndGate.Size2d;
        /**
        * Determines if the ImageSource has been loaded.
        */
        public IsLoaded(): boolean;
        /**
        * Returns an ImageSource that is extracted from the current ImageSource based on the provided clip location and clip size.
        * @param clipX The horizontal location of the clip.
        * @param clipY The vertical location of the clip.
        * @param clipWidth The width of the clip.
        * @param clipHeight The height of the clip.
        */
        public Extract(clipX: number, clipY: number, clipWidth: number, clipHeight: number): ImageSource;
        /**
        * Disposes the image source and unbinds all bound events.
        */
        public Dispose(): void;
        /**
        * Returns an identical copy of this image source.  Uses existing base image source.
        */
        public Clone(): ImageSource;
    }
}
declare module EndGate.Sound {
    /**
    * Defines a set of settings that are used to play AudioClip's a custom way.
    */
    class AudioSettings implements EndGate.ICloneable {
        /**
        * The default audio settings.
        */
        static Default: AudioSettings;
        /**
        * Gets or sets the repeat function of the AudioClip.
        */
        public Repeat: boolean;
        /**
        * Gets or sets the volume level of the AudioClip. Value between 0-100.
        */
        public Volume: number;
        /**
        * Gets or sets the auto play functionality of the AudioClip.
        */
        public AutoPlay: boolean;
        /**
        * Gets or sets the preload functionality of the AudioClip.  Values can be "auto", "metadata", or "none".
        */
        public Preload: string;
        /**
        * Creates a new instance of the AudioSettings object with default values.
        */
        constructor();
        /**
        * Creates a new instance of the AudioSettings object.
        * @param repeat Initial value of the repeat component.
        */
        constructor(repeat: boolean);
        /**
        * Creates a new instance of the AudioSettings object.
        * @param repeat Initial value of the repeat component.
        * @param volume Initial value of the volume component. Value between 0-100.
        */
        constructor(repeat: boolean, volume: number);
        /**
        * Creates a new instance of the AudioSettings object.
        * @param repeat Initial value of the repeat component.
        * @param volume Initial value of the volume component. Value between 0-100.
        * @param autoplay Initial value of the auto play component.
        */
        constructor(repeat: boolean, volume: number, autoplay: boolean);
        /**
        * Creates a new instance of the AudioSettings object.
        * @param repeat Initial value of the repeat component.
        * @param volume Initial value of the volume component. Value between 0-100.
        * @param autoplay Initial value of the auto play component.
        * @param preload Initial value of the preload component.  Values can be "auto", "metadata", or "none".
        */
        constructor(repeat: boolean, volume: number, autoplay: boolean, preload: string);
        /**
        * Returns a new AudioSettings object that is identical to the current AudioSettings object.
        */
        public Clone(): AudioSettings;
    }
}
declare module EndGate.Sound {
    /**
    * Defines a single audio clip that can be played, stopped or paused.
    */
    class AudioClip implements EndGate.IDisposable {      
        /**
        * Creates a new instance of the AudioClip object.
        * @param source An audio element to use as the source audio clip.
        */
        constructor(source: HTMLAudioElement);
        /**
        * Creates a new instance of the AudioClip object.
        * @param source An array of source paths to audio clips.  Pass in multiple audio types of the same clip to ensure cross browser compatibility.
        */
        constructor(source: string[]);
        /**
        * Creates a new instance of the AudioClip object.
        * @param source Source path to an audio clip.
        */
        constructor(source: string);
        /**
        * Creates a new instance of the AudioClip object.
        * @param source Source path to an audio clip.
        * @param settings Audio clip settings.
        */
        constructor(source: string, settings: Sound.AudioSettings);
        /**
        * Creates a new instance of the AudioClip object.
        * @param source An array of source paths to audio clips.  Pass in multiple audio types of the same clip to ensure cross browser compatibility.
        * @param settings Audio clip settings.
        */
        constructor(source: string[], settings: Sound.AudioSettings);
        /**
        * Creates a new instance of the AudioClip object.
        * @param source An audio element to use as the source audio clip.
        * @param settings Audio clip settings.
        */
        constructor(source: HTMLAudioElement, settings: Sound.AudioSettings);
        /**
        * Gets an event that is triggered when the audio clip has completed, will not trigger if the audio clip is repeating.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnComplete : EndGate.EventHandler1<Event>;
        /**
        * Gets or sets the audio clip volume.
        */
        public Volume : number;
        /**
        * Determines if the AudioClip is currently playing.
        */
        public IsPlaying(): boolean;
        /**
        * Determines if the AudioClip has completed.
        */
        public IsComplete(): boolean;
        /**
        * Plays the current audio clip.
        */
        public Play(): void;
        /**
        * Pauses the current audio clip.
        */
        public Pause(): void;
        /**
        * Seeks the audio clip to the provided time.
        * @param time The time to seek to.
        */
        public Seek(time: number): void;
        /**
        * Stops the current audio clip and seeks back to time 0.
        */
        public Stop(): void;
        /**
        * Unbinds all events and nulls out the settings and audio component to allow for garbage collection.
        */
        public Dispose(): void;  
    }
}
declare module EndGate.Sound {
    /**
    * Defines an AudioPlayer that is mapped to a specific source.  Ultimately used to play the same sound simultaneously.
    */
    class AudioPlayer { 
        /**
        * Creates a new instance of the AudioPlayer object.
        * @param source Source path to an audio clip.
        */
        constructor(source: string);
        /**
        * Creates a new instance of the AudioPlayer object.
        * @param source An array of source paths to audio clips.  Pass in multiple audio types of the same clip to ensure cross browser compatibility.
        */
        constructor(source: string[]);
        /**
        * Builds an AudioClip with the default settings.
        */
        public BuildClip(): Sound.AudioClip;
        /**
        * Builds an AudioClip with the provided settings.
        * @param settings Audio settings to play the AudioClip with.
        */
        public BuildClip(settings: Sound.AudioSettings): Sound.AudioClip;
        /**
        * Builds an AudioClip and plays it with the default settings.  Returns the built audio clip.
        */
        public Play(): Sound.AudioClip;
        /**
        * Builds an AudioClip and plays it with the provided settings.  Returns the built audio clip.
        * @param settings Audio settings to play the AudioClip with.
        */
        public Play(settings: Sound.AudioSettings): Sound.AudioClip;
    }
}
declare module EndGate.Content {
    /**
    * Defines a content manager that is used to preload AudioClip's and ImageSource's so that they can be used throughout a game.
    */
    class ContentManager {  
        /**
        * Creates a new instance of the ContentManager object.
        */
        constructor();
        /**
        * Loads the image located at the provided source location as an ImageSource.  Returns the loaded ImageSource.
        * @param name The mapped name for the ImageSource.
        * @param src Source path to the base image.
        */
        public LoadImage(name: string, src: string): EndGate.Graphics.ImageSource;
        /**
        * Loads the image located at the provided source location as an ImageSource.  Returns the loaded ImageSource.
        * @param name The mapped name for the ImageSource.
        * @param src Source path to the base image.
        * @param width Width of the image source.
        * @param height Height of the image source.
        */
        public LoadImage(name: string, src: string, width: number, height: number): EndGate.Graphics.ImageSource;
        /**
        * Retrieves an ImageSource designated under the provided name.
        * @param name The mapped name of the ImageSource to retrieve.
        */
        public GetImage(name: string): EndGate.Graphics.ImageSource;
        /**
        * Unload the ImageSource that is mapped to the provided name.
        * @param name The mapped name of the ImageSource to unload.
        */
        public UnloadImage(name: string): boolean;
        /**
        * Loads an AudioPlayer for the provided clip info.  Returns the loaded player for easy access.
        * @param name The mapped name for the AudioPlayer.
        * @param src Source path to an audio clip.
        */
        public LoadAudio(name: string, src: string): EndGate.Sound.AudioPlayer;
        /**
        * Loads an AudioPlayer, returns the AudioPlayer for easy access.
        * @param name The mapped name for the AudioPlayer.
        * @param src An array of source paths to audio clips.  Pass in multiple audio types of the same clip to ensure cross browser compatibility.
        */
        public LoadAudio(name: string, src: string[]): EndGate.Sound.AudioPlayer;
        /**
        * Retrieves a loaded audio player under the provided name.
        * @param name The mapped name of the AudioPlayer to retrieve.
        */
        public GetAudio(name: string): EndGate.Sound.AudioPlayer;
        /**
        * Unload the AudioPlayer that is mapped to the provided name.
        * @param name The mapped name of the AudioPlayer to unload.
        */
        public UnloadAudio(name: string): EndGate.Sound.AudioPlayer;
    }
}
declare module EndGate {
    /**
    * Defines a virtual Game object that is meant to be derived from.  Games contain a multitude of management objects to control every aspect of the game.
    */
    class Game implements EndGate.IUpdateable, EndGate.IDisposable { 
        /**
        * The games configuration.  Used to modify settings such as the game update rate.
        */
        public Configuration: EndGate.GameConfiguration;
        /**
        * A collision manager which is used to actively detect collisions between monitored Collidable's.
        */
        public CollisionManager: EndGate.Collision.CollisionManager;
        /**
        * A scene manager which is used to draw Graphic2d's onto the game screen.
        */
        public Scene: EndGate.Rendering.Scene2d;
        /**
        * An input manager which is used to monitor mouse and keyboard events.
        */
        public Input: EndGate.Input.InputManager;
        /**
        * A content manager which is used to load, unload and retrieve images and audio sources.
        */
        public Content: EndGate.Content.ContentManager;    
        /**
        * Creates a new instance of the Game object.  A default canvas will be created that fills the DOM body.
        */
        constructor();
        /**
        * Creates a new instance of the Game object.
        * @param gameCanvas The canvas to utilize as the game area.
        */
        constructor(gameCanvas: HTMLCanvasElement);  
        /**
        * Triggered at the start of the game.  All audio sources and images should be loaded in this method.
        */
        public LoadContent(): void;
        /**
        * Triggered on a regular interval defined by the GameConfiguration.
        * @param gameTime The global game time object.  Used to represent total time running and used to track update interval elapsed speeds.
        */
        public Update(gameTime: EndGate.GameTime): void; 
        /**
        * Triggered as fast as possible.  Determined by the current browsers repaint rate.
        */
        public Draw(context: CanvasRenderingContext2D): void;
        /**
        * Removes game canvas and disposes all tracked objects.
        */
        public Dispose(): void;
    }
}
declare module EndGate.MovementControllers.Assets {
    /**
    * Defines a direction management object that represents directional state.
    */
    class LinearDirections {
        /**
        * Indicates whether the object is moving left.
        */
        public Left: boolean;
        /**
        * Indicates whether the object is moving right.
        */
        public Right: boolean;
        /**
        * Indicates whether the object is moving up.
        */
        public Up: boolean;
        /**
        * Indicates whether the object is moving down.
        */
        public Down: boolean;
        /**
        * Creates a new instance of the LinearDirection object with all directions= indicators initially set to false.
        */
        constructor();
    }
}
declare module EndGate.MovementControllers {
    /**
    * Represents a move event object that is used to depict a movement, specifically a direction and whether or not the move started or stopped.
    */
    interface IMoveEvent {
        /**
        * The movement direction.
        */
        Direction: string;
        /**
        * Whether or not the move started or stopped.
        */
        StartMoving: boolean;
    }
}
declare module EndGate.MovementControllers {
    /**
    * Abstract class that holds moveable objects and synchronizes positions across them.
    */
    class MovementController implements EndGate.IMoveable, EndGate.IUpdateable {
        /**
        * Gets or sets the position of the MovementController
        */
        public Position: EndGate.Vector2d;
        /**
        * Gets or sets the velocity of the MovementController.
        */
        public Velocity: EndGate.Vector2d;
        /**
        * Gets or sets the rotation of the MovementController
        */
        public Rotation: number;  
        /**
        * Should only ever be called by derived classes.
        * @param moveables Moveable objects to synchronize.
        */
        constructor(moveables: EndGate.IMoveable[]);
        /**
        * Prevents the MovementController from updating object locations.
        */
        public Freeze(): void;
        /**
        * Used to re-enable movement within the MovementController.
        */
        public Thaw(): void;
        /**
        * Determines if the MovementController is moving.  Frozen MovementControllers are not considered moving.
        */
        public IsMoving(): boolean;
        /**
        * Synchronizes the current position with all tracked moveable objects.  MovementController's must be updated in order to move.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: EndGate.GameTime): void;
    }
}
declare module EndGate.MovementControllers {
    /**
    * Defines a LinearMovementController that can move objects Up, Right, Left, Down or a combination.
    */
    class LinearMovementController extends MovementControllers.MovementController {    
        /**
        * Creates a new instance of the LinearMovementController object which rotates the provided moveable's on movements and can move diagonally.
        * @param movables Array of moveable objects that will be moved when the movement controller moves (this cannot change after construction).
        * @param moveSpeed How fast the movement controller will move.
        */
        constructor(movables: EndGate.IMoveable[], moveSpeed: number);
        /**
        * Creates a new instance of the LinearMovementController object which can move diagonally.
        * @param movables Array of moveable objects that will be moved when the movement controller moves (this cannot change after construction).
        * @param moveSpeed How fast the movement controller will move.
        * @param rotateWithMovements Whether the movables should rotate to face their moving direction, default is true (this cannot change after construction).
        */
        constructor(movables: EndGate.IMoveable[], moveSpeed: number, rotateWithMovements: boolean);
        /**
        * Creates a new instance of the LinearMovementController object..
        * @param movables Array of moveable objects that will be moved when the movement controller moves (this cannot change after construction).
        * @param moveSpeed How fast the movement controller will move.
        * @param rotateWithMovements Whether the movables should rotate to face their moving direction.  Default is true (this cannot change after construction).
        * @param multiDirectional Whether multiple movements can occur simultaneously, resulting in diagonal movements. Default is true (this cannot change after construction).
        */
        constructor(movables: EndGate.IMoveable[], moveSpeed: number, rotateWithMovements: boolean, multiDirectional: boolean);
        /**
        * Event: Triggered when a the movement controller starts or stops a movement.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes an IMoveEvent to bound functions.
        */
        public OnMove: EndGate.EventHandler1<MovementControllers.IMoveEvent>;
        /**
        * Determines if the movement controller is moving in the provided direction.
        * @param direction The direction to check.
        */
        public IsMovingInDirection(direction: string): boolean;
        /**
        * Starts moving the movement controller in the specified direction.
        * @param direction The direction to start moving.
        */
        public StartMoving(direction: string): void;
        /**
        * Stops the movement controller from moving in the specified direction.
        * @param direction The direction to stop moving.
        */
        public StopMoving(direction: string): void;
        /**
        * Gets the current move speed.
        */
        public MoveSpeed(): number;
        /**
        * Sets and gets the current move speed.
        * @param speed The new move speed.
        */
        public MoveSpeed(speed: number): number;
        /**
        * Moves the LinearMovementController in the currently active directions.  MovementController's must be updated in order to move.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: EndGate.GameTime): void;
        /**
        * Triggers a move event on the MovementController.
        * @param direction The direction to start or stop moving.
        * @param startMoving Whether the movement is starting or stopping.
        */
        public Move(direction: string, startMoving: boolean): void;   
    }
}
declare module EndGate.InputControllers {
    /**
    * Defines a DirectionalInputController that will monitor Up, Right, Left, and Down movement attempts.
    */
    class DirectionalInputController {   
        /**
        * Creates a new instance of the DirectionalInputController object with default key controls.
        * @param keyboard A keyboard handler in order to bind directional events.
        * @param onMove The function to trigger when the user attempts to perform a move.  Passes the direction ("Left", "Right", "Up", "Down") and whether the movement was started or stopped.
        */
        constructor(keyboard: EndGate.Input.KeyboardHandler, onMove: (direction: string, startMoving: boolean) => void);
        /**
        * Creates a new instance of the DirectionalInputController object with custom key controls.
        * @param keyboard A keyboard handler in order to bind directional events.
        * @param onMove The function to trigger when the user attempts to perform a move.  Passes the direction ("Left", "Right", "Up", "Down") and whether the movement was started or stopped.
        * @param upKeys Array of keys to trigger an "Up" movement.  Default is ["w", "Up"].
        * @param rightKeys Array of keys to trigger a "Right" movement.  Default is ["d", "Right"].
        * @param downKeys Array of keys to trigger a "Down" movement.  Default is ["s", "Down"].
        * @param leftKeys Array of keys to trigger a "Left" movement.  Default is ["a", "Left"].
        */
        constructor(keyboard: EndGate.Input.KeyboardHandler, onMove: (direction: string, startMoving: boolean) => void, upKeys: string[], rightKeys: string[], downKeys: string[], leftKeys: string[]); 
    }
}
declare module EndGate.Graphics {
    /**
    * Color class used to pass around colors in a typed manner.
    */
    class Color implements EndGate.ICloneable, EndGate.IDisposable {    
        /**
        * Creates a new instance of Color with color channels set to black.
        */
        constructor();
        /**
        * Creates a new instance of Color with the specified string.
        * @param color Hex, named or function style string declaration.
        */
        constructor(color: string);
        /**
        * Creates a new instance of Color with the specified rgb channels.
        * @param r The red channel. Must be between 0 and 255 inclusive.
        * @param g The green channel. Must be between 0 and 255 inclusive.
        * @param b The blue channel. Must be between 0 and 255 inclusive.
        */
        constructor(r: number, g: number, b: number);
        /**
        * Creates a new instance of Color with the specified rgba channels.
        * @param r The red channel. Must be between 0 and 255 inclusive.
        * @param g The green channel. Must be between 0 and 255 inclusive.
        * @param b The blue channel. Must be between 0 and 255 inclusive.
        * @param a The alpha channel. Must be between 0 and 1 inclusive.
        */
        constructor(r: number, g: number, b: number, a: number);
        /**
        * Gets an EventHandler that is triggered when the R, G, B, or A values of this Color change.
        */
        public OnChange : EndGate.EventHandler1<Color>;
        /**
        * Gets or sets the current red channel. Value must be an integer between 0 and 255 inclusive.
        */
        public R : number;
        /**
        * Gets or sets the current green channel. Value must be an integer between 0 and 255 inclusive.
        */
        public G : number;
        /**
        * Gets or sets the current blue channel. Value must be an integer between 0 and 255 inclusive.
        */
        public B : number;
        /**
        * Gets or sets the current alpha channel. Value must be between 0 and 1 inclusive.
        */
        public A : number;
        /**
        * Creates a new Color object with the specified RGB values.
        * @param r The red channel. Must be between 0 and 255 inclusive.
        * @param g The green channel. Must be between 0 and 255 inclusive.
        * @param b The blue channel. Must be between 0 and 255 inclusive.
        */
        static FromRGB(r: number, g: number, b: number): Color;
        /**
        * Creates a new Color object with the specified RGBA values.
        * @param r The red channel. Must be between 0 and 255 inclusive.
        * @param g The green channel. Must be between 0 and 255 inclusive.
        * @param b The blue channel. Must be between 0 and 255 inclusive.
        * @param a The alpha channel. Must be between 0 and 1 inclusive.
        */
        static FromRGBA(r: number, g: number, b: number, a: number): Color;
        /**
        * Creates a new Color object with the specified ARGB values.
        * @param a The alpha channel. Must be between 0 and 1 inclusive.
        * @param r The red channel. Must be between 0 and 255 inclusive.
        * @param g The green channel. Must be between 0 and 255 inclusive.
        * @param b The blue channel. Must be between 0 and 255 inclusive.
        */
        static FromARGB(a: number, r: number, g: number, b: number): Color;
        /**
        * Creates a new Color object from the specified hex assignment.
        * @param hex The hex based color code.
        */
        static FromHex(hex: string): Color;
        /**
        * Creates a new Color object form the HTML5 named colors.
        * @param name The name of the HTML5 color to use.
        */
        static FromName(name: string): Color;       
        /**
        * Returns a transparent Color object.
        */
        static Transparent : Color;
        /**
        * Returns a Color object set to the color named color AliceBlue.
        */
        static AliceBlue : Color;
        /**
        * Returns a Color object set to the color named color AntiqueWhite.
        */
        static AntiqueWhite : Color;
        /**
        * Returns a Color object set to the color named color Aqua.
        */
        static Aqua : Color;
        /**
        * Returns a Color object set to the color named color Aquamarine.
        */
        static Aquamarine : Color;
        /**
        * Returns a Color object set to the color named color Azure.
        */
        static Azure : Color;
        /**
        * Returns a Color object set to the color named color Beige.
        */
        static Beige : Color;
        /**
        * Returns a Color object set to the color named color Bisque.
        */
        static Bisque : Color;
        /**
        * Returns a Color object set to the color named color Black.
        */
        static Black : Color;
        /**
        * Returns a Color object set to the color named color BlanchedAlmond.
        */
        static BlanchedAlmond : Color;
        /**
        * Returns a Color object set to the color named color Blue.
        */
        static Blue : Color;
        /**
        * Returns a Color object set to the color named color BlueViolet.
        */
        static BlueViolet : Color;
        /**
        * Returns a Color object set to the color named color Brown.
        */
        static Brown : Color;
        /**
        * Returns a Color object set to the color named color BurlyWood.
        */
        static BurlyWood : Color;
        /**
        * Returns a Color object set to the color named color CadetBlue.
        */
        static CadetBlue : Color;
        /**
        * Returns a Color object set to the color named color Chartreuse.
        */
        static Chartreuse : Color;
        /**
        * Returns a Color object set to the color named color Chocolate.
        */
        static Chocolate : Color;
        /**
        * Returns a Color object set to the color named color Coral.
        */
        static Coral : Color;
        /**
        * Returns a Color object set to the color named color CornflowerBlue.
        */
        static CornflowerBlue : Color;
        /**
        * Returns a Color object set to the color named color Cornsilk.
        */
        static Cornsilk : Color;
        /**
        * Returns a Color object set to the color named color Crimson.
        */
        static Crimson : Color;
        /**
        * Returns a Color object set to the color named color Cyan.
        */
        static Cyan : Color;
        /**
        * Returns a Color object set to the color named color DarkBlue.
        */
        static DarkBlue : Color;
        /**
        * Returns a Color object set to the color named color DarkCyan.
        */
        static DarkCyan : Color;
        /**
        * Returns a Color object set to the color named color DarkGoldenRod.
        */
        static DarkGoldenRod : Color;
        /**
        * Returns a Color object set to the color named color DarkGray.
        */
        static DarkGray : Color;
        /**
        * Returns a Color object set to the color named color DarkGreen.
        */
        static DarkGreen : Color;
        /**
        * Returns a Color object set to the color named color DarkKhaki.
        */
        static DarkKhaki : Color;
        /**
        * Returns a Color object set to the color named color DarkMagenta.
        */
        static DarkMagenta : Color;
        /**
        * Returns a Color object set to the color named color DarkOliveGreen.
        */
        static DarkOliveGreen : Color;
        /**
        * Returns a Color object set to the color named color DarkOrange.
        */
        static DarkOrange : Color;
        /**
        * Returns a Color object set to the color named color DarkOrchid.
        */
        static DarkOrchid : Color;
        /**
        * Returns a Color object set to the color named color DarkRed.
        */
        static DarkRed : Color;
        /**
        * Returns a Color object set to the color named color DarkSalmon.
        */
        static DarkSalmon : Color;
        /**
        * Returns a Color object set to the color named color DarkSeaGreen.
        */
        static DarkSeaGreen : Color;
        /**
        * Returns a Color object set to the color named color DarkSlateBlue.
        */
        static DarkSlateBlue : Color;
        /**
        * Returns a Color object set to the color named color DarkSlateGray.
        */
        static DarkSlateGray : Color;
        /**
        * Returns a Color object set to the color named color DarkTurquoise.
        */
        static DarkTurquoise : Color;
        /**
        * Returns a Color object set to the color named color DarkViolet.
        */
        static DarkViolet : Color;
        /**
        * Returns a Color object set to the color named color DeepPink.
        */
        static DeepPink : Color;
        /**
        * Returns a Color object set to the color named color DeepSkyBlue.
        */
        static DeepSkyBlue : Color;
        /**
        * Returns a Color object set to the color named color DimGray.
        */
        static DimGray : Color;
        /**
        * Returns a Color object set to the color named color DodgerBlue.
        */
        static DodgerBlue : Color;
        /**
        * Returns a Color object set to the color named color FireBrick.
        */
        static FireBrick : Color;
        /**
        * Returns a Color object set to the color named color FloralWhite.
        */
        static FloralWhite : Color;
        /**
        * Returns a Color object set to the color named color ForestGreen.
        */
        static ForestGreen : Color;
        /**
        * Returns a Color object set to the color named color Fuchsia.
        */
        static Fuchsia : Color;
        /**
        * Returns a Color object set to the color named color Gainsboro.
        */
        static Gainsboro : Color;
        /**
        * Returns a Color object set to the color named color GhostWhite.
        */
        static GhostWhite : Color;
        /**
        * Returns a Color object set to the color named color Gold.
        */
        static Gold : Color;
        /**
        * Returns a Color object set to the color named color GoldenRod.
        */
        static GoldenRod : Color;
        /**
        * Returns a Color object set to the color named color Gray.
        */
        static Gray : Color;
        /**
        * Returns a Color object set to the color named color Green.
        */
        static Green : Color;
        /**
        * Returns a Color object set to the color named color GreenYellow.
        */
        static GreenYellow : Color;
        /**
        * Returns a Color object set to the color named color HoneyDew.
        */
        static HoneyDew : Color;
        /**
        * Returns a Color object set to the color named color HotPink.
        */
        static HotPink : Color;
        /**
        * Returns a Color object set to the color named color IndianRed.
        */
        static IndianRed : Color;
        /**
        * Returns a Color object set to the color named color Indigo.
        */
        static Indigo : Color;
        /**
        * Returns a Color object set to the color named color Ivory.
        */
        static Ivory : Color;
        /**
        * Returns a Color object set to the color named color Khaki.
        */
        static Khaki : Color;
        /**
        * Returns a Color object set to the color named color Lavender.
        */
        static Lavender : Color;
        /**
        * Returns a Color object set to the color named color LavenderBlush.
        */
        static LavenderBlush : Color;
        /**
        * Returns a Color object set to the color named color LawnGreen.
        */
        static LawnGreen : Color;
        /**
        * Returns a Color object set to the color named color LemonChiffon.
        */
        static LemonChiffon : Color;
        /**
        * Returns a Color object set to the color named color LightBlue.
        */
        static LightBlue : Color;
        /**
        * Returns a Color object set to the color named color LightCoral.
        */
        static LightCoral : Color;
        /**
        * Returns a Color object set to the color named color LightCyan.
        */
        static LightCyan : Color;
        /**
        * Returns a Color object set to the color named color LightGoldenRodYellow.
        */
        static LightGoldenRodYellow : Color;
        /**
        * Returns a Color object set to the color named color LightGray.
        */
        static LightGray : Color;
        /**
        * Returns a Color object set to the color named color LightGrey.
        */
        static LightGrey : Color;
        /**
        * Returns a Color object set to the color named color LightGreen.
        */
        static LightGreen : Color;
        /**
        * Returns a Color object set to the color named color LightPink.
        */
        static LightPink : Color;
        /**
        * Returns a Color object set to the color named color LightSalmon.
        */
        static LightSalmon : Color;
        /**
        * Returns a Color object set to the color named color LightSeaGreen.
        */
        static LightSeaGreen : Color;
        /**
        * Returns a Color object set to the color named color LightSkyBlue.
        */
        static LightSkyBlue : Color;
        /**
        * Returns a Color object set to the color named color LightSlateGray.
        */
        static LightSlateGray : Color;
        /**
        * Returns a Color object set to the color named color LightSteelBlue.
        */
        static LightSteelBlue : Color;
        /**
        * Returns a Color object set to the color named color LightYellow.
        */
        static LightYellow : Color;
        /**
        * Returns a Color object set to the color named color Lime.
        */
        static Lime : Color;
        /**
        * Returns a Color object set to the color named color LimeGreen.
        */
        static LimeGreen : Color;
        /**
        * Returns a Color object set to the color named color Linen.
        */
        static Linen : Color;
        /**
        * Returns a Color object set to the color named color Magenta.
        */
        static Magenta : Color;
        /**
        * Returns a Color object set to the color named color Maroon.
        */
        static Maroon : Color;
        /**
        * Returns a Color object set to the color named color MediumAquaMarine.
        */
        static MediumAquaMarine : Color;
        /**
        * Returns a Color object set to the color named color MediumBlue.
        */
        static MediumBlue : Color;
        /**
        * Returns a Color object set to the color named color MediumOrchid.
        */
        static MediumOrchid : Color;
        /**
        * Returns a Color object set to the color named color MediumPurple.
        */
        static MediumPurple : Color;
        /**
        * Returns a Color object set to the color named color MediumSeaGreen.
        */
        static MediumSeaGreen : Color;
        /**
        * Returns a Color object set to the color named color MediumSlateBlue.
        */
        static MediumSlateBlue : Color;
        /**
        * Returns a Color object set to the color named color MediumSpringGreen.
        */
        static MediumSpringGreen : Color;
        /**
        * Returns a Color object set to the color named color MediumTurquoise.
        */
        static MediumTurquoise : Color;
        /**
        * Returns a Color object set to the color named color MediumVioletRed.
        */
        static MediumVioletRed : Color;
        /**
        * Returns a Color object set to the color named color MidnightBlue.
        */
        static MidnightBlue : Color;
        /**
        * Returns a Color object set to the color named color MintCream.
        */
        static MintCream : Color;
        /**
        * Returns a Color object set to the color named color MistyRose.
        */
        static MistyRose : Color;
        /**
        * Returns a Color object set to the color named color Moccasin.
        */
        static Moccasin : Color;
        /**
        * Returns a Color object set to the color named color NavajoWhite.
        */
        static NavajoWhite : Color;
        /**
        * Returns a Color object set to the color named color Navy.
        */
        static Navy : Color;
        /**
        * Returns a Color object set to the color named color OldLace.
        */
        static OldLace : Color;
        /**
        * Returns a Color object set to the color named color Olive.
        */
        static Olive : Color;
        /**
        * Returns a Color object set to the color named color OliveDrab.
        */
        static OliveDrab : Color;
        /**
        * Returns a Color object set to the color named color Orange.
        */
        static Orange : Color;
        /**
        * Returns a Color object set to the color named color OrangeRed.
        */
        static OrangeRed : Color;
        /**
        * Returns a Color object set to the color named color Orchid.
        */
        static Orchid : Color;
        /**
        * Returns a Color object set to the color named color PaleGoldenRod.
        */
        static PaleGoldenRod : Color;
        /**
        * Returns a Color object set to the color named color PaleGreen.
        */
        static PaleGreen : Color;
        /**
        * Returns a Color object set to the color named color PaleTurquoise.
        */
        static PaleTurquoise : Color;
        /**
        * Returns a Color object set to the color named color PaleVioletRed.
        */
        static PaleVioletRed : Color;
        /**
        * Returns a Color object set to the color named color PapayaWhip.
        */
        static PapayaWhip : Color;
        /**
        * Returns a Color object set to the color named color PeachPuff.
        */
        static PeachPuff : Color;
        /**
        * Returns a Color object set to the color named color Peru.
        */
        static Peru : Color;
        /**
        * Returns a Color object set to the color named color Pink.
        */
        static Pink : Color;
        /**
        * Returns a Color object set to the color named color Plum.
        */
        static Plum : Color;
        /**
        * Returns a Color object set to the color named color PowderBlue.
        */
        static PowderBlue : Color;
        /**
        * Returns a Color object set to the color named color Purple.
        */
        static Purple : Color;
        /**
        * Returns a Color object set to the color named color Red.
        */
        static Red : Color;
        /**
        * Returns a Color object set to the color named color RosyBrown.
        */
        static RosyBrown : Color;
        /**
        * Returns a Color object set to the color named color RoyalBlue.
        */
        static RoyalBlue : Color;
        /**
        * Returns a Color object set to the color named color SaddleBrown.
        */
        static SaddleBrown : Color;
        /**
        * Returns a Color object set to the color named color Salmon.
        */
        static Salmon : Color;
        /**
        * Returns a Color object set to the color named color SandyBrown.
        */
        static SandyBrown : Color;
        /**
        * Returns a Color object set to the color named color SeaGreen.
        */
        static SeaGreen : Color;
        /**
        * Returns a Color object set to the color named color SeaShell.
        */
        static SeaShell : Color;
        /**
        * Returns a Color object set to the color named color Sienna.
        */
        static Sienna : Color;
        /**
        * Returns a Color object set to the color named color Silver.
        */
        static Silver : Color;
        /**
        * Returns a Color object set to the color named color SkyBlue.
        */
        static SkyBlue : Color;
        /**
        * Returns a Color object set to the color named color SlateBlue.
        */
        static SlateBlue : Color;
        /**
        * Returns a Color object set to the color named color SlateGray.
        */
        static SlateGray : Color;
        /**
        * Returns a Color object set to the color named color Snow.
        */
        static Snow : Color;
        /**
        * Returns a Color object set to the color named color SpringGreen.
        */
        static SpringGreen : Color;
        /**
        * Returns a Color object set to the color named color SteelBlue.
        */
        static SteelBlue : Color;
        /**
        * Returns a Color object set to the color named color Tan.
        */
        static Tan : Color;
        /**
        * Returns a Color object set to the color named color Teal.
        */
        static Teal : Color;
        /**
        * Returns a Color object set to the color named color Thistle.
        */
        static Thistle : Color;
        /**
        * Returns a Color object set to the color named color Tomato.
        */
        static Tomato : Color;
        /**
        * Returns a Color object set to the color named color Turquoise.
        */
        static Turquoise : Color;
        /**
        * Returns a Color object set to the color named color Violet.
        */
        static Violet : Color;
        /**
        * Returns a Color object set to the color named color Wheat.
        */
        static Wheat : Color;
        /**
        * Returns a Color object set to the color named color White.
        */
        static White : Color;
        /**
        * Returns a Color object set to the color named color WhiteSmoke.
        */
        static WhiteSmoke : Color;
        /**
        * Returns a Color object set to the color named color Yellow.
        */
        static Yellow : Color;
        /**
        * Returns a Color object set to the color named color YellowGreen.
        */
        static YellowGreen : Color;
        /**
        * Returns a copy of the color with the current color channels.
        */
        public Clone(): any;
        /**
        * Disposes the Color object and unbinds any active event bindings.
        */
        public Dispose(): void;
        /**
        * toString override that returns the Color in the "rgba(r,g,b,a)" format.
        */
        public toString(): string;
    }
}
declare module EndGate.Graphics {
    /**
    * Abstract drawable shape type that is used create customizable drawable graphics.
    */
    class Shape extends Graphics.Graphic2d {       
        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current shape object.
        */
        constructor(position: EndGate.Vector2d);
        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current shape object.
        * @param color Initial Color of the current shape object.
        */
        constructor(position: EndGate.Vector2d, color: Graphics.Color);
        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current shape object.
        * @param color Initial string Color of the current shape object.
        */
        constructor(position: EndGate.Vector2d, color: string);
        /**
        * Gets or sets the current shape color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public Color : Graphics.Color;
        /**
        * Gets or sets the current border thickness.
        */
        public BorderThickness : number;
        /**
        * Gets or sets the current border color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public BorderColor : Graphics.Color;
        /**
        * Gets or sets the current shadow color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public ShadowColor : Graphics.Color;
        /**
        * Gets or sets the current horizontal shadow position.
        */
        public ShadowX : number;
        /**
        * Gets or sets the current vertical shadow position.
        */
        public ShadowY : number;
        /**
        * Gets or sets the current shadow blur.
        */
        public ShadowBlur : number;
        /**
        * Sets the current borders thickness and color.
        * @param thickness The new border thickness in pixels.
        * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Border(thickness: number, color: string): void;
        /**
        * Sets the current borders thickness and color.
        * @param thickness The new border thickness in pixels.
        * @param color The new border color.
        */
        public Border(thickness: number, color: Graphics.Color): void;
        /**
        * Sets the current shadow x and y positions.
        * @param x The shadows new horizontal position.
        * @param y The shadows new vertical position.
        */
        public Shadow(x: number, y: number): void;
        /**
        * Sets the current shadow x and y positions and shadows color.
        * @param x The shadows new horizontal position.
        * @param y The shadows new vertical position.
        * @param color The new shadow color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Shadow(x: number, y: number, color: string): void;
        /**
        * Sets the current shadow x and y positions and shadows color.
        * @param x The shadows new horizontal position.
        * @param y The shadows new vertical position.
        * @param color The new shadow color.
        */
        public Shadow(x: number, y: number, color: Graphics.Color): void;
        /**
        * Sets the current shadow x and y positions and shadows color.
        * @param x The shadows new horizontal position.
        * @param y The shadows new vertical position.
        * @param color The new shadow color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        * @param blur The new shadow blur.
        */
        public Shadow(x: number, y: number, color: string, blur: number): void;
        /**
        * Sets the current shadow x and y positions and shadows color.
        * @param x The shadows new horizontal position.
        * @param y The shadows new vertical position.
        * @param color The new shadow color.
        * @param blur The new shadow blur.
        */
        public Shadow(x: number, y: number, color: Graphics.Color, blur: number): void;   
        /**
        * Draws the shape onto the given context.  If this shape is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the shape onto.
        */
        public Draw(context: CanvasRenderingContext2D): void;
        public Dispose(): void; 
    }
}
declare module EndGate.Graphics.Assets {
    /**
    * Defines valid FontFamilies that can be used to display Text2d's differently.
    */
    enum FontFamily {
        Antiqua,
        Arial,
        Avqest,
        Blackletter,
        Calibri,
        ComicSans,
        Courier,
        Decorative,
        Fraktur,
        Frosty,
        Garamond,
        Georgia,
        Helvetica,
        Impact,
        Minion,
        Modern,
        Monospace,
        Palatino,
        Roman,
        Script,
        Swiss,
        TimesNewRoman,
        Verdana,
    }
}
declare module EndGate.Graphics.Assets {
    /**
    * Defines valid FontVariant's that can be used to change the appearance of Text2d's.
    */
    enum FontVariant {
        Normal,
        SmallCaps,
    }
}
declare module EndGate.Graphics.Assets {
    /**
    * Defines valid FontStyles that can be used to modify the font's style for Text2d's.
    */
    enum FontStyle {
        Normal,
        Italic,
        Oblique,
    }
}
declare module EndGate.Graphics.Assets {
    /**
    * Defines a set of font settings that are used to modify the appearance of text that is drawn via Text2d's.
    */
    class FontSettings {   
        /**
        * Creates a new instance of the FontSettings object with the following default values.
        * FontSize: 10px
        * FontFamily: Times New Roman
        */
        constructor();
        /**
        * Gets or sets the current font size.  Values can be things such as 20px.
        */
        public FontSize : string;
        /**
        * Gets or sets the font family.
        */
        public FontFamily : Assets.FontFamily;
        /**
        * Gets or sets the font variant.
        */
        public FontVariant : Assets.FontVariant;
        /**
        * Gets or sets the current font weight.
        */
        public FontWeight : string;
        /**
        * Gets or sets the current font style.
        */
        public FontStyle : Assets.FontStyle; 
    }
}
declare module EndGate.Graphics {
    /**
    * Defines a drawable text element.
    */
    class Text2d extends Graphics.Shape {     
        /**
        * Creates a new instance of the Text2d object.
        * @param x Initial horizontal location of the Text2d.
        * @param y Initial vertical location of the Text2d.
        * @param text Initial text of the Text2d.
        */
        constructor(x: number, y: number, text: string);
        /**
        * Creates a new instance of the Text2d object with a specified color.
        * @param x Initial horizontal location of the Text2d.
        * @param y Initial vertical location of the Text2d.
        * @param text Initial text of the Text2d.
        * @param color Initial color of the Text2d. Default is Black.
        */
        constructor(x: number, y: number, text: string, color: Graphics.Color);
        /**
        * Creates a new instance of the Text2d object with a specified color.
        * @param x Initial horizontal location of the Text2d.
        * @param y Initial vertical location of the Text2d.
        * @param text Initial text of the Text2d.
        * @param color Initial string color of the Text2d. Default is Black.
        */
        constructor(x: number, y: number, text: string, color: string);
        /**
        * Gets or sets the text alignment of the Text2d.  Values can be "start", "end", "left", "center", or "right".
        */
        public Align : string;
        /**
        * Gets or sets the text baseline of the Text2d.  Values can be "top", "hanging", "middle", "alphabetic", "ideographic", and "bottom".
        */
        public Baseline : string;
        /**
        * Gets the Text2d's FontSetting's.
        */
        public FontSettings : Graphics.Assets.FontSettings;
        /**
        * Gets or sets the current Text2d's text.
        */
        public Text : string;  
        /**
        * Draws the text onto the given context.  If this Text2d is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the text onto.
        */
        public Draw(context: CanvasRenderingContext2D): void;
        /**
        * The bounding area that represents where the Text2d will draw.
        */
        public GetDrawBounds(): EndGate.Bounds.Bounds2d;
        /**
        * Scale's the fonts FontSize.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void;
        /**
        * Returns a nearly identical copy of this Text2d.  If this Text2d belongs to a parent, the cloned Text2d will not. If this Text2d has children, all children will be cloned as well.  Lastly, the cloned Text2d will not have the same event bindings as this one does.
        */
        public Clone(): Text2d;
    }
}
declare module EndGate.Graphics {
    /**
    * Defines a drawable sprite.  Sprites are used to draw images to the game screen.
    */
    class Sprite2d extends Graphics.Graphic2d { 
        /**
        * Gets or sets the Image that is drawn to the game screen.
        */
        public Image: Graphics.ImageSource;
        /**
        * Gets or sets the size of the Sprite2d.  If the Size is not equal to the image's ClipSize the Sprite2d will appear stretched.
        */
        public Size: EndGate.Size2d;
        /**
        * Creates a new instance of the Sprite2d object with an initial size matching the image's clip size.
        * @param x Initial horizontal location of the Sprite2d.
        * @param y Initial vertical location of the Sprite2d.
        * @param image Initial ImageSource of the Sprite2d.
        */
        constructor(x: number, y: number, image: Graphics.ImageSource);
        /**
        * Creates a new instance of the Sprite2d object.
        * @param x Initial horizontal location of the Sprite2d.
        * @param y Initial vertical location of the Sprite2d.
        * @param image Initial ImageSource of the Sprite2d.
        * @param width Initial width of the Sprite2d.  If the width does not equal the width of the image's clip width the Sprite2d will appear stretched.
        * @param height Initial height of the Sprite2d.  If the height does not equal the height of the image's clip height the Sprite2d will appear stretched.
        */
        constructor(x: number, y: number, image: Graphics.ImageSource, width: number, height: number);
        /**
        * Draws the sprite onto the given context.  If this sprite is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the sprite onto.
        */
        public Draw(context: CanvasRenderingContext2D): void;
        /**
        * The bounding area that represents where the Sprite2d will draw.
        */
        public GetDrawBounds(): EndGate.Bounds.Bounds2d;
        /**
        * Scale's the Sprite2d graphic.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void;
        /**
        * Returns a nearly identical copy of this Sprite2d.  If this Sprite2d belongs to a parent, the cloned Sprite2d will not. If this Sprite2d has children, all children will be cloned as well.  Lastly, the cloned Sprite2d will not have the same event bindings as this one does.
        */
        public Clone(): Sprite2d;
    }
}
declare module EndGate.Graphics {
    /**
    * Defines an animation that can be drawn to the screen.
    */
    class SpriteAnimation implements EndGate.IDisposable {            
        /**
        * Creates a new instance of the SpriteAnimation object.
        * @param imageSource The Sprite sheet that contains the image frames used to display the animation.
        * @param fps How fast to play the animation (frames per second).  This value should not be less than the games update interval.
        * @param frameSize How large each animation frame is within the imageSource sprite sheet.
        * @param frameCount How many frames to play for the animation.
        */
        constructor(imageSource: Graphics.ImageSource, fps: number, frameSize: EndGate.Size2d, frameCount: number);
        /**
        * Creates a new instance of the SpriteAnimation object.
        * @param imageSource The Sprite sheet that contains the image frames used to display the animation.
        * @param fps How fast to play the animation (frames per second).  This value should not be less than the games update interval.
        * @param frameSize How large each animation frame is within the imageSource sprite sheet.
        * @param frameCount How many frames to play for the animation.
        * @param startOffset The positional offset within the imageSource on where the set of animation frames begin.
        */
        constructor(imageSource: Graphics.ImageSource, fps: number, frameSize: EndGate.Size2d, frameCount: number, startOffset: EndGate.Vector2d);
        /**
        * Gets an event that is triggered when the animation has completed, will not trigger if the animation is repeating.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnComplete : EndGate.EventHandler;
        /**
        * Gets or sets the current frames per second.
        */
        public Fps : number;
        /**
        * Determines if the animation is currently playing.
        */
        public IsPlaying(): boolean;
        /**
        * Determines if the animation can play.  This is essentially checking if the underlying image source is loaded.
        */
        public CanPlay(): boolean;
        /**
        * Plays the animation.
        */
        public Play(): void;
        /**
        * Plays the animation.
        * @param repeat Whether to play the animation on repeat.
        */
        public Play(repeat: boolean): void;
        /**
        * Pauses the animation.
        */
        public Pause(): void;
        /**
        * Steps the animation 1 frame forward.  If not repeating and the animation surpasses the maximum frame count, the animation will stop and the OnComplete event will trigger.
        */
        public Step(): void;
        /**
        * Steps the animation 1 frame forward.  If not repeating and the animation surpasses the maximum frame count, the animation will stop and the OnComplete event will trigger.
        * @param count How many frames to move forward
        */
        public Step(count: number): void;
        /**
        * Stops the animation and resets the current animation frame to 0.
        */
        public Stop(): void;
        /**
        * Stops the animation.
        * @param resetFrame Whether to reset the current animation frame to 0.
        */
        public Stop(resetFrame: boolean): void;
        /**
        * Resets the current animation frame to 0.
        */
        public Reset(): void;
        /**
        * Updates the animations current frame.  Needs to be updated in order to play the animation.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: EndGate.GameTime): void;
        /**
        * Unbinds all events.  Does not dispose the underlying image source.
        */
        public Dispose(): void;   
    }
}
declare module EndGate.Graphics {
    /**
    * Defines a drawable circle.
    */
    class Circle extends Graphics.Shape { 
        /**
        * Gets or sets the Radius of the Circle.
        */
        public Radius: number;
        /**
        * Creates a new instance of the Circle object.
        * @param x Initial horizontal location of the Circle.
        * @param y Initial vertical location of the Circle.
        * @param radius Initial Radius of the Circle.
        */
        constructor(x: number, y: number, radius: number);
        /**
        * Creates a new instance of the Circle object with a specified color.
        * @param x Initial horizontal location of the Circle.
        * @param y Initial vertical location of the Circle.
        * @param radius Initial Radius of the Circle.
        * @param color Initial color of the Circle.
        */
        constructor(x: number, y: number, radius: number, color: Graphics.Color);
        /**
        * Creates a new instance of the Circle object with a specified color.
        * @param x Initial horizontal location of the Circle.
        * @param y Initial vertical location of the Circle.
        * @param radius Initial Radius of the Circle.
        * @param color Initial color string of the Circle.
        */
        constructor(x: number, y: number, radius: number, color: string);
        /**
        * The bounding area that represents where the Circle will draw.
        */
        public GetDrawBounds(): EndGate.Bounds.Bounds2d;
        /**
        * Scale's the circle graphic.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void;
        /**
        * Returns a nearly identical copy of this Circle.  If this Circle belongs to a parent, the cloned Circle will not. If this Circle has children, all children will be cloned as well.  Lastly, the cloned Circle will not have the same event bindings as this one does.
        */
        public Clone(): Circle; 
    }
}
declare module EndGate.Graphics {
    /**
    * Defines a drawable rectangle.
    */
    class Rectangle extends Graphics.Shape { 
        /**
        * Gets or sets the Size of the Rectangle.
        */
        public Size: EndGate.Size2d;
        /**
        * Creates a new instance of the Rectangle object.
        * @param x Initial horizontal location of the Rectangle.
        * @param y Initial vertical location of the Rectangle.
        * @param width Initial width of the Rectangle.
        * @param height Initial height of the Rectangle.
        */
        constructor(x: number, y: number, width: number, height: number);
        /**
        * Creates a new instance of the Rectangle object with a specified color.
        * @param x Initial horizontal location of the Rectangle.
        * @param y Initial vertical location of the Rectangle.
        * @param width Initial width of the Rectangle.
        * @param height Initial height of the Rectangle.
        * @param color Initial color of the Rectangle.
        */
        constructor(x: number, y: number, width: number, height: number, color: Graphics.Color);
        /**
        * Creates a new instance of the Rectangle object with a specified color.
        * @param x Initial horizontal location of the Rectangle.
        * @param y Initial vertical location of the Rectangle.
        * @param width Initial width of the Rectangle.
        * @param height Initial height of the Rectangle.
        * @param color Initial string color of the Rectangle.
        */
        constructor(x: number, y: number, width: number, height: number, color: string);
        /**
        * The bounding area that represents where the Rectangle will draw.
        */
        public GetDrawBounds(): EndGate.Bounds.Bounds2d;
        /**
        * Scale's the rectangle graphic.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void;
        /**
        * Returns a nearly identical copy of this Rectangle.  If this Rectangle belongs to a parent, the cloned Rectangle will not. If this Rectangle has children, all children will be cloned as well.  Lastly, the cloned Rectangle will not have the same event bindings as this one does.
        */
        public Clone(): Rectangle; 
    }
}
declare module EndGate.Graphics {
    /**
    * Defines a drawable 2d line element.
    */
    class Line2d extends Graphics.Graphic2d {        
        /**
        * Creates a new instance of the Line2d object with a line width of 1.
        * @param fromX Starting horizontal coordinate.
        * @param fromY Starting vertical coordinate.
        * @param toX Ending horizontal coordinate.
        * @param toY Ending vertical coordinate.
        */
        constructor(fromX: number, fromY: number, toX: number, toY: number);
        /**
        * Creates a new instance of the Line2d object with a specified line width.
        * @param fromX Starting horizontal coordinate.
        * @param fromY Starting vertical coordinate.
        * @param toX Ending horizontal coordinate.
        * @param toY Ending vertical coordinate.
        * @param lineWidth Initial thickness of the line.
        */
        constructor(fromX: number, fromY: number, toX: number, toY: number, lineWidth: number);
        /**
        * Creates a new instance of the Line2d object with a specified line width and color.
        * @param fromX Starting horizontal coordinate.
        * @param fromY Starting vertical coordinate.
        * @param toX Ending horizontal coordinate.
        * @param toY Ending vertical coordinate.
        * @param lineWidth Initial thickness of the line.
        * @param color Initial color of the line.
        */
        constructor(fromX: number, fromY: number, toX: number, toY: number, lineWidth: number, color: Graphics.Color);
        /**
        * Creates a new instance of the Line2d object with a specified line width and color.
        * @param fromX Starting horizontal coordinate.
        * @param fromY Starting vertical coordinate.
        * @param toX Ending horizontal coordinate.
        * @param toY Ending vertical coordinate.
        * @param lineWidth Initial thickness of the line.
        * @param color Initial color string of the line.
        */
        constructor(fromX: number, fromY: number, toX: number, toY: number, lineWidth: number, color: string);
        /**
        * Gets or sets the From location of the Line2d.
        */
        public From : EndGate.Vector2d;
        /**
        * Gets or sets the To location of the Line2d.
        */
        public To : EndGate.Vector2d;
        /**
        * Gets or sets the line color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public Color : Graphics.Color;
        /**
        * Gets or sets the line width.
        */
        public LineWidth : number;
        /**
        * Gets or sets the line cap.  Values can be "butt", "round", "square".
        */
        public LineCap : string;
        /**
        * Draws the line onto the given context.  If this Line2d is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the line onto.
        */
        public Draw(context: CanvasRenderingContext2D): void;
        /**
        * The bounding area that represents where the Line2d will draw.
        */
        public GetDrawBounds(): EndGate.Bounds.Bounds2d;
        /**
        * Scale's the Line2d graphic.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void;
        /**
        * Returns a nearly identical copy of this Line2d.  If this Line2d belongs to a parent, the cloned Line2d will not. If this Line2d has children, all children will be cloned as well.  Lastly, the cloned Line2d will not have the same event bindings as this one does.
        */
        public Clone(): Line2d;
        public Dispose(): void;  
    }
}
declare module EndGate.Graphics {
    /**
    * Defines a drawable grid that can be used to store other graphics in a grid like structure.
    */
    class Grid extends Graphics.Graphic2d {         
        /**
        * Creates a new instance of the Grid object.
        * @param x Initial horizontal location of the grid.
        * @param y Initial vertical location of the grid.
        * @param rows Number of rows the grid will have (this cannot change after construction).
        * @param columns Number of columns the grid will have (this cannot change after construction).
        * @param tileWidth The width of the grid tiles (this cannot change after construction).
        * @param tileHeight The height of the grid tiles (this cannot change after construction).
        */
        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number);
        /**
        * Creates a new instance of the Grid object.
        * @param x Initial horizontal location of the grid.
        * @param y Initial vertical location of the grid.
        * @param rows Number of rows the grid will have (this cannot change after construction).
        * @param columns Number of columns the grid will have (this cannot change after construction).
        * @param tileWidth The width of the grid tiles (this cannot change after construction).
        * @param tileHeight The height of the grid tiles (this cannot change after construction).
        * @param drawGridLines Initial value for DrawGridLines.
        */
        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number, drawGridLines: boolean);
        /**
        * Creates a new instance of the Grid object.
        * @param x Initial horizontal location of the grid.
        * @param y Initial vertical location of the grid.
        * @param rows Number of rows the grid will have (this cannot change after construction).
        * @param columns Number of columns the grid will have (this cannot change after construction).
        * @param tileWidth The width of the grid tiles (this cannot change after construction).
        * @param tileHeight The height of the grid tiles (this cannot change after construction).
        * @param drawGridLines Initial value for DrawGridLines.
        * @param gridLineColor Initial grid line color (only useful if drawGridLines is true);
        */
        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number, drawGridLines: boolean, gridLineColor: Graphics.Color);
        /**
        * Creates a new instance of the Grid object.
        * @param x Initial horizontal location of the grid.
        * @param y Initial vertical location of the grid.
        * @param rows Number of rows the grid will have (this cannot change after construction).
        * @param columns Number of columns the grid will have (this cannot change after construction).
        * @param tileWidth The width of the grid tiles (this cannot change after construction).
        * @param tileHeight The height of the grid tiles (this cannot change after construction).
        * @param drawGridLines Initial value for DrawGridLines.
        * @param gridLineColor Initial grid line color (only useful if drawGridLines is true);
        */
        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number, drawGridLines: boolean, gridLineColor: string);
        /**
        * Gets or sets the DrawGridLines property.  Indicates whether the grids column and row lines will be drawn.
        */
        public DrawGridLines : boolean;
        /**
        * Gets or sets the current grid line color.  Grid lines are only drawn of DrawGridLines is set to true.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public GridLineColor : Graphics.Color;
        /**
        * Gets the size of the grid.
        */
        public Size : EndGate.Size2d;
        /**
        * Gets the size of the tiles.
        */
        public TileSize : EndGate.Size2d;
        /**
        * Gets the number of rows.
        */
        public Rows : number;
        /**
        * Gets the number of columns.
        */
        public Columns : number;
        /**
        * Fills a tile with the provided graphic.
        * @param row The row.
        * @param column The column.
        * @param graphic The graphic to fill the tile with.
        */
        public Fill(row: number, column: number, graphic: Graphics.Graphic2d): void;
        /**
        * Fills a row with the provided graphics
        * @param row The row to fill.
        * @param graphicList The list of graphics to fill the row with.  The row will be filled with as many elements that are contained within the graphicList.
        */
        public FillRow(row: number, graphicList: Graphics.Graphic2d[]): void;
        /**
        * Fills a row with the provided graphics starting at the provided column
        * @param row The row to fill.
        * @param graphicList The list of graphics to fill the row with.  The row will be filled with as many elements that are contained within the graphicList.
        * @param columnOffset The column to start filling at.
        */
        public FillRow(row: number, graphicList: Graphics.Graphic2d[], columnOffset: number): void;
        /**
        * Fills a column with the provided graphics
        * @param column The column to fill.
        * @param graphicList The list of graphics to fill the column with.  The column will be filled with as many elements that are contained within the graphicList.
        */
        public FillColumn(column: number, graphicList: Graphics.Graphic2d[]): void;
        /**
        * Fills a column with the provided graphics starting at the provided row.
        * @param column The column to fill.
        * @param graphicList The list of graphics to fill the column with.  The column will be filled with as many elements that are contained within the graphicList.
        * @param rowOffset The row to start filling at.
        */
        public FillColumn(column: number, graphicList: Graphics.Graphic2d[], rowOffset: number): void;
        /**
        * Fills a tile with the provided graphic.
        * @param row The row to start filling at.
        * @param column The column to start filling at.
        * @param graphicList The list of graphics to fill the space with.  The space will be filled with as many elements that are contained within the multi-dimensional graphicList.
        */
        public FillSpace(row: number, column: number, graphicList: Graphics.Graphic2d[][]): void;
        /**
        * Gets a graphic within the grid.
        * @param row The row.
        * @param column The column.
        */
        public Get(row: number, column: number): Graphics.Graphic2d;
        /**
        * Retrieves graphics within the provided row.
        * @param row The row to retrieve.
        */
        public GetRow(row: number): Graphics.Graphic2d[];
        /**
        * Retrieves graphics within the row starting at the provided column offset.
        * @param row The row to retrieve.
        * @param columnOffset The column to start retrieving the row at.
        */
        public GetRow(row: number, columnOffset: number): Graphics.Graphic2d[];
        /**
        * Retrieves graphics within the provided column.
        * @param column The column to retrieve.
        */
        public GetColumn(column: number): Graphics.Graphic2d[];
        /**
        * Retrieves graphics within the column starting at the provided row offset.
        * @param column The column to retrieve.
        * @param rowOffset The row to start retrieving the column at.
        */
        public GetColumn(column: number, rowOffset: number): Graphics.Graphic2d[];
        /**
        * Retrieves graphics within row column cross section.
        * @param rowStart The row to start pulling graphics from.
        * @param columnStart The column to start pulling graphics from.
        * @param rowEnd The row to stop pulling graphics from.
        * @param columnEnd The column to stop pulling graphics from.
        */
        public GetSpace(rowStart: number, columnStart: number, rowEnd: number, columnEnd: number): Graphics.Graphic2d[];
        /**
        * Clear a grid tile.
        * @param row The row.
        * @param column The column.
        */
        public Clear(row: number, column: number): Graphics.Graphic2d;
        /**
        * Clears graphics within the provided row.
        * @param row The row to clear.
        */
        public ClearRow(row: number): Graphics.Graphic2d[];
        /**
        * Clears graphics within the row starting at the provided column offset.
        * @param row The row to clear.
        * @param columnOffset The column to start clearing the row at.
        */
        public ClearRow(row: number, columnOffset: number): Graphics.Graphic2d[];
        /**
        * Clears graphics within the provided column.
        * @param column The column to clear.
        */
        public ClearColumn(column: number): Graphics.Graphic2d[];
        /**
        * Clears graphics within the column starting at the provided column offset.
        * @param column The column to clear.
        * @param rowOffset The row to start clearing the column at.
        */
        public ClearColumn(column: number, rowOffset: number): Graphics.Graphic2d[];
        /**
        * Clears graphics within row column cross section.
        * @param rowStart The row to start clearing graphics from.
        * @param columnStart The column to start clearing graphics from.
        * @param rowEnd The row to stop clearing graphics from.
        * @param columnEnd The column to stop clearing graphics from.
        */
        public ClearSpace(rowStart: number, columnStart: number, rowEnd: number, columnEnd: number): Graphics.Graphic2d[];
        /**
        * Draws the grid onto the given context.  If this grid is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the grid onto.
        */
        public Draw(context: CanvasRenderingContext2D): void;
        /**
        * The bounding area that represents where the grid will draw.
        */
        public GetDrawBounds(): EndGate.Bounds.Bounds2d;
        /**
        * Scale is not implemented.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void;
        /**
        * Converts the provided vertical coordinate to a row number that is based on the current grid.
        * @param y The vertical coordinate to convert to a row.
        */
        public ConvertToRow(y: number): number;
        /**
        * Converts the provided horizontal coordinate to a column number that is based on the current grid.
        * @param x The horizontal component to convert to a column.
        */
        public ConvertToColumn(x: number): number;
        /**
        * Returns a nearly identical copy of this Grid.  If this Grid belongs to a parent, the cloned Grid will not. If this Grid has children, all children will be cloned as well.  Lastly, the cloned Grid will not have the same event bindings as this one does.
        */
        public Clone(): Grid;    
    }
}
declare module EndGate {
    /**
    * Defines a matrix with 2 columns and 2 rows (2x2).
    */
    class Matrix2x2 implements EndGate.ICloneable { 
        /**
        * Gets or sets the matrix values.  Represents the current Matrix2x2 as a multi-dimensional array.
        */
        public Values: number[][];
        /**
        * Creates a new instance of Matrix2x2 with all rows and columns initialized to 0.
        */
        constructor();
        /**
        * Creates a new instance of Matrix2x2.
        * @param topLeft The row 0 column 0 initial value.
        * @param topRight The row 0 column 1 initial value.
        * @param botLeft The row 1 column 0 initial value.
        * @param botRight The row 1 column 1 initial value.
        */
        constructor(topLeft: number, topRight: number, botLeft: number, botRight: number);
        /**
        * Creates a Matrix2x2 with all its rows and columns initialized to 0.
        */
        static Zero : Matrix2x2;
        /**
        * Returns the identity matrix for a 2x2.
        */
        static Identity : Matrix2x2;
        /**
        * Executes the action with each row and column item of this Matrix2x2 and modifies their values.
        * @param action The function used to modify each row and column items.
        */
        public Apply(action: (val: number) => number): void;
        /**
        * Executes the action with each row and column item of this Matrix2x2.
        * @param action The function to pass the row column item to.
        */
        public Trigger(action: (val: number) => void): void;
        /**
        * Returns a Matrix2x2 that is the result of adding the current Matrix2x2 to the provided Matrix2x2.
        * @param val The Matrix2x2 to add.
        */
        public Add(val: Matrix2x2): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of adding the current Matrix2x2 to the provided number.
        * @param val The number to add.
        */
        public Add(val: number): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of multiplying the current Matrix2x2 by the provided Matrix2x2.
        * @param val The Matrix2x2 to multiply.
        */
        public Multiply(val: Matrix2x2): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of multiplying the current Matrix2x2 by the provided number.
        * @param val The number to multiply.
        */
        public Multiply(val: number): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of subtracting the current Matrix2x2 by the provided Matrix2x2.
        * @param val The Matrix2x2 to subtract.
        */
        public Subtract(val: Matrix2x2): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of subtracting the current Matrix2x2 by the provided number.
        * @param val The number to subtract.
        */
        public Subtract(val: number): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of subtracting the current Matrix2x2 from the provided Matrix2x2.
        * @param val The Matrix2x2 to subtract from.
        */
        public SubtractFrom(val: Matrix2x2): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of subtracting the current Matrix2x2 from the provided number.
        * @param val The number to subtract from.
        */
        public SubtractFrom(val: number): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of dividing the current Matrix2x2 by the provided Matrix2x2.
        * @param val The Matrix2x2 to divide.
        */
        public Divide(val: Matrix2x2): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of dividing the current Matrix2x2 by the provided number.
        * @param val The number to divide.
        */
        public Divide(val: number): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of dividing the current Matrix2x2 from the provided Matrix2x2.
        * @param val The Matrix2x2 to divide from.
        */
        public DivideFrom(val: Matrix2x2): Matrix2x2;
        /**
        * Returns a Matrix2x2 that is the result of dividing the current Matrix2x2 from the provided number.
        * @param val The number to divide from.
        */
        public DivideFrom(val: number): Matrix2x2;
        /**
        * Returns a Vector2d that has been transformed by the current Matrix2x2.
        * @param vector The vector to transform.
        */
        public Transform(vector: EndGate.Vector2d): EndGate.Vector2d;
        /**
        * Returns the transpose of the current Matrix2x2.
        */
        public Transpose(): Matrix2x2;
        /**
        * Returns the determinant of the current Matrix2x2.
        */
        public Determinant(): number;
        /**
        * Returns the inverse of the current Matrix2x2.
        */
        public Inverse(): Matrix2x2;
        /**
        * Returns a Matrix2x2 that has identical rows and columns as the current Matrix2x2.
        */
        public Clone(): Matrix2x2;
        /**
        * Determines whether this Matrix2x2 has the same row and column values as the provided Matrix2x2.
        * @param matrix The Matrix2x2 to compare the current Matrix2x2 to.
        */
        public Equivalent(matrix: Matrix2x2): boolean;
        /**
        * Overridden toString method to display Matrix2x2 in easy to read format: "[topLeft, topRight] [botLeft, botRight]"
        */
        public toString(): string;
        /**
        * Creates a scaling matrix based off the provided Vector2d.
        * @param vector The vector used to determine the X and Y scaling values.
        */
        static Scale(vector: EndGate.Vector2d): Matrix2x2;
    }
}
declare function asyncLoop(action: (next: () => void, index: number) => void, count: number, onComplete?: () => void): void;
declare module EndGate.Graphics {
    /**
    * Defines an abstract class TileMap that takes an array of resources to be mapped to tiles.
    */
    class TileMap extends Graphics.Graphic2d { 
        /**
        * Creates a new instance of the TileMap object.
        * @param x Initial horizontal location of the tile map.
        * @param y Initial vertical location of the tile map.
        * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
        */
        constructor(x: number, y: number, resources: Graphics.ImageSource[]);
        /**
        * Scale is not implemented.
        */
        public Scale(scale: number): void;
    }
}
declare module EndGate.Graphics.Assets {
    /**
    * Defines an object that is used to fully describe a loaded tile.
    */
    interface ITileDetails {
        /**
        * The Tile that will be on the map.
        */
        Tile: Graphics.Sprite2d;
        /**
        * The resource index that was used to build the tile.
        */
        ResourceIndex: number;
        /**
        * The row that the tile occupies.
        */
        Row: number;
        /**
        * The column that the tile occupies.
        */
        Column: number;
        /**
        * The TileMap that contains the Tile.  This can be used to determine the absolute position of the Tile by adding the Parent and Tile's position.
        */
        Parent: Graphics.TileMap;
    }
}
declare module EndGate.Graphics.Assets {
    /**
    * Defines a SquareTile that is used by the SquareTileMap.  Represents one tile within the tile map.
    */
    class SquareTile extends Graphics.Sprite2d {
        /**
        * Creates a new instance of the SquareTile object.
        * @param image The image that is within the tile.
        * @param width The width of the tile.
        * @param height The height of the tile.
        */
        constructor(image: Graphics.ImageSource, width: number, height: number);
    }
}
declare module EndGate.Graphics {
    /**
    * Defines a structure that is proficient at creating diverse tile maps based off of a resource image.  Best drawn via a SceneryHandler.
    */
    class SquareTileMap extends Graphics.TileMap {
        /**
        * Gets or sets the tile load delay component.  This can be used to slowly load a square tile map to prevent the browser from freezing by adding a delay between tile loads to allow time for the DOM to update.  Defaults to TimeSpan.Zero.
        */
        public TileLoadDelay: EndGate.TimeSpan;
        /**
        * Gets or sets the row load delay component.  This can be used to slowly load a square tile map to prevent the browser from freezing by adding a delay between row loads to allow time for the DOM to update.  Defaults to TimeSpan.Zero.
        */
        public RowLoadDelay: EndGate.TimeSpan;          
        /**
        * Creates a new instance of the SquareTileMap object.
        * @param x Initial horizontal location of the tile map.
        * @param y Initial vertical location of the tile map.
        * @param tileWidth The width of the tile map tiles (this cannot change after construction).
        * @param tileHeight The height of the tile map tiles (this cannot change after construction).
        * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
        * @param mappings A two dimensional array numbers that map directly to the resources array to define the square tile map (this cannot change after construction).
        */
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.ImageSource[], mappings: number[][]);
        /**
        * Creates a new instance of the SquareTileMap object.
        * @param x Initial horizontal location of the tile map.
        * @param y Initial vertical location of the tile map.
        * @param tileWidth The width of the tile map tiles (this cannot change after construction).
        * @param tileHeight The height of the tile map tiles (this cannot change after construction).
        * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
        * @param mappings A two dimensional array numbers that map directly to the resources array to define the square tile map (this cannot change after construction).
        * @param staticMap Whether or not image tiles will change throughout the SquareTileMap's lifetime, defaults to true and cannot change after construction.
        */
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.ImageSource[], mappings: number[][], staticMap: boolean);
        /**
        * Creates a new instance of the SquareTileMap object.
        * @param x Initial horizontal location of the tile map.
        * @param y Initial vertical location of the tile map.
        * @param tileWidth The width of the tile map tiles (this cannot change after construction).
        * @param tileHeight The height of the tile map tiles (this cannot change after construction).
        * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
        * @param mappings A two dimensional array numbers that map directly to the resources array to define the square tile map (this cannot change after construction).
        * @param staticMap Whether or not image tiles will change throughout the SquareTileMap's lifetime, defaults to true and cannot change after construction.
        * @param drawGridLines Whether or not to draw the tile maps grid lines. Useful when trying to pinpoint specific tiles (this cannot change after construction).
        */
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.ImageSource[], mappings: number[][], staticMap: boolean, drawGridLines: boolean);
        /**
        * Gets an event that is triggered when a tile has been loaded, first argument is the tile details for the loaded tile, second is the percent complete.  Once this SquareTileMap has been created and all tiles loaded this event will no longer be triggered. Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnTileLoad : EndGate.EventHandler2<Graphics.Assets.ITileDetails, number>;
        /**
        * Gets an event that is triggered when the square tile map has been loaded.  Once this SquareTileMap has been created and all tiles loaded this event will no longer be triggered. Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnLoaded : EndGate.EventHandler;
        /**
        * Helper function used to take a SpriteSheet image and create a one dimensional resource tile array.
        * @param imageSource The sprite sheet to extract the tile resources from.
        * @param tileWidth The width of the sprite sheet tiles.
        * @param tileHeight The height of the sprite sheet tiles.
        */
        static ExtractTiles(imageSource: Graphics.ImageSource, tileWidth: number, tileHeight: number): Graphics.ImageSource[];
        /**
        * Determines if the current SquareTileMap is loaded.
        */
        public IsLoaded(): boolean;
        /**
        * Draws the SquareTileMap onto the given context.  If the SquareTileMap is part of a Scene2d or SceneryHandler the Draw function will be called automatically.
        * @param context The canvas context to draw the SquareTileMap onto.
        */
        public Draw(context: CanvasRenderingContext2D): void;
        /**
        * The bounding area that represents where the SquareTileMap will draw.
        */
        public GetDrawBounds(): EndGate.Bounds.Bounds2d;
        /**
        * Removes all children and unbinds all events associated with the SquareTileMap.
        */
        public Dispose(): void;
        /**
        * Returns a nearly identical copy of this SquareTileMap.  If this SquareTileMap belongs to a parent, the cloned SquareTileMap will not. If this SquareTileMap has children, all children will be cloned as well.  Lastly, the cloned SquareTileMap will not have the same event bindings as this one does.
        */
        public Clone(): SquareTileMap;     
    }
}
interface Number extends EndGate.ICloneable {
    Clone: () => Number;
}
declare module EndGate.MapLoaders {
    /**
    * Defines an IHookFunction that represents a function that can be used to hook into map loading tiles.
    */
    interface IHookFunction {
        (details: EndGate.Graphics.Assets.ITileDetails, propertyValue: string): any;
    }
}
declare module EndGate.MapLoaders {
    /**
    * Defines an object that contains all the information needed to create a scenic map.
    */
    interface IMapLoadedResult {
        /**
        * Gets or sets the layers that will represent the scenery of the game.  Each layer should be added to the scenery in order to draw the layers.
        */
        Layers: EndGate.Graphics.TileMap[];
    }
}
declare module EndGate.MapLoaders {
    /**
    * Defines an object that contains some immediately available information about the map that is about to be loaded.
    */
    interface IMapPreloadInfo {
        /**
        * The total number of layers the map contains.
        */
        LayerCount: number;
        /**
        * The total number of tile resource sheets that are used to represent the map.
        */
        ResourceSheetCount: number;
        /**
        * The total number of tiles within the map (empty or not).
        */
        TileCount: number;
        /**
        * Gets an event that is triggered when the percent loaded value has changed, first argument is the percent loaded (0-1).  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        OnPercentLoaded: EndGate.EventHandler1<number>;
    }
}
declare module EndGate.MapLoaders {
    /**
    * Defines an object that can be used to provide hooks to adjust tiles as they are built.
    */
    interface IPropertyHooks {
        /**
        * Hooks to trigger when a resource tile with the specified property is used when loading a map.  Passes in the created tile and the property value for the hook.
        */
        ResourceTileHooks?: {
            [property: string]: MapLoaders.IHookFunction;
        };
        /**
        * Hooks to trigger when a resource sheet with the specified property is used when loading a map.  Passes in created tiles from the resource sheet and the property value for the hook.
        */
        ResourceSheetHooks?: {
            [property: string]: MapLoaders.IHookFunction;
        };
        /**
        * Hooks to trigger when a layer with the specified property is used when loading a map.  Passes in created tiles from the layer and the property value for the hook.
        */
        LayerHooks?: {
            [property: string]: MapLoaders.IHookFunction;
        };
    }
}
declare module EndGate.MapLoaders {
    /**
    * Defines an object that can load data and output a result asynchronously.
    */
    interface IMapLoader {
        /**
        * Loads the provided data then calls the onComplete function once valid map data has been created.
        * @param data The base data that will be transformed into the IMapLoadedResult format.
        * @param propertyHooks Property hooks that can be used to modify tiles while they're loading.
        * @param onComplete The function to trigger when the data has been converted into a valid IMapLoadedResult.
        */
        Load(data: any, propertyHooks: MapLoaders.IPropertyHooks, onComplete: (result: MapLoaders.IMapLoadedResult) => any): MapLoaders.IMapPreloadInfo;
    }
}
declare module EndGate.MapLoaders {
    /**
    * Defines supported JSON formats for map loading.
    */
    enum JSONFormat {
        TMX,
    }
}
declare module EndGate.MapLoaders {
    /**
    * Defines a JSON loader that is used to load maps.
    */
    class JSONLoader { 
        /**
        * Loads the provided tmx formatted json object then calls the onComplete function once the json has been transformed.
        * @param json The JSON data that represents the map.
        * @param onComplete The function to trigger when the json has been converted into a valid IMapLoadedResult.
        */
        static Load(json: Object, onComplete: (result: MapLoaders.IMapLoadedResult) => any): MapLoaders.IMapPreloadInfo;
        /**
        * Loads the provided json object then calls the onComplete function once the json has been transformed.
        * @param json The JSON data that represents the map.
        * @param onComplete The function to trigger when the json has been converted into a valid IMapLoadedResult.
        * @param propertyHooks Property hooks that can be used to modify tiles while they're loading.  All maps that are loaded are static square tile maps, therefore modified tiles will only be drawn once.
        */
        static Load(json: Object, onComplete: (result: MapLoaders.IMapLoadedResult) => any, propertyHooks: MapLoaders.IPropertyHooks): MapLoaders.IMapPreloadInfo;
        /**
        * Loads the provided json object then calls the onComplete function once the json has been transformed.
        * @param json The JSON data that represents the map.
        * @param onComplete The function to trigger when the json has been converted into a valid IMapLoadedResult.
        * @param propertyHooks Property hooks that can be used to modify tiles while they're loading.  All maps that are loaded are static square tile maps, therefore modified tiles will only be drawn once.
        * @param format The format of the JSON object.  Defaults to the tmx format.
        */
        static Load(json: Object, onComplete: (result: MapLoaders.IMapLoadedResult) => any, propertyHooks: MapLoaders.IPropertyHooks, format: MapLoaders.JSONFormat): MapLoaders.IMapPreloadInfo;
    }
}
declare module EndGate.Particles {
    /**
    * Defines a range that is used to describe a range of values.
    */
    class Range<T> implements EndGate.ICloneable {
        /**
        * Gets or sets the minimum value of the range.
        */
        public Min: T;
        /**
        * Gets or sets the maximum value of the range.
        */
        public Max: T;
        /**
        * Creates a new instance of the Range object.
        * @param value The min and max value of the range.
        */
        constructor(value: T);
        /**
        * Creates a new instance of the Range object.
        * @param min The initial min value of the range.
        * @param max The initial max value of the range.
        */
        constructor(min: T, max: T);
        /**
        * Returns an identical copy of this range.
        */
        public Clone(): Range<T>;
        /**
        * Returns a random number between range.Min and range.Max.
        * @param range The range used to bound the number value.
        */
        static RandomNumber(range: Range<number>): number;
        /**
        * Returns a random TimeSpan between range.Min and range.Max.
        * @param range The range used to bound the TimeSpan value.
        */
        static RandomTimeSpan(range: Range<EndGate.TimeSpan>): EndGate.TimeSpan;
    }
}
declare module EndGate.Tweening.Functions {
    /**
    * Defines an ITweeningFunction interface that represents a function that can be used to translate Tween's.
    */
    interface ITweeningFunction {
        (from: number, to: number, elapsed: EndGate.TimeSpan, duration: EndGate.TimeSpan): number;
    }
}
declare module EndGate.Tweening.Functions {
    /**
    * Defines a Linear tweening function that has an EaseNone function that can be used with Tween's.
    */
    class Linear { 
        /**
        * Gets the Linear EaseNone function.
        */
        static EaseNone : Functions.ITweeningFunction;
    }
}
declare module EndGate.Tweening {
    /**
    * Defines a base Tween class that is used to move a value from a start value to an end value.
    */
    class Tween<T extends EndGate.ICloneable> implements EndGate.IDisposable, EndGate.IUpdateable {         
        /**
        * Creates a new instance of the Tween object.  This should only ever be called from derived classes via a super constructor call.
        * @param from Start value.
        * @param to End value.
        * @param duration How fast to move the current value from start to end.
        * @param tweeningFunction The function to use to translate the current value from start to end.  Different functions result in different translation behavior.
        */
        constructor(from: T, to: T, duration: EndGate.TimeSpan, tweeningFunction: Tweening.Functions.ITweeningFunction);
        /**
        * Gets an event that is triggered when the tween has changed its Current value, occurs directly after a tween update.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnChange : EndGate.EventHandler1<T>;
        /**
        * Gets an event that is triggered when the tween has completed transitioning the Current value, once triggered Elapsed will be equivalent to Duration and Current will be equivalent to To.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnComplete : EndGate.EventHandler1<Tween<T>>;
        /**
        * Gets or sets the From component of the tween.
        */
        public From : T;
        /**
        * Gets or sets the To component of the tween.
        */
        public To : T;
        /**
        * Gets or sets the Current component of the tween.  The Current is the current value of the tween, the final value of Current will be equivalent to To when the tween has completed.
        */
        public Current : T;
        /**
        * Gets or sets the Duration component of the tween.  The Duration is how long the tween will take to go From -> To.
        */
        public Duration : EndGate.TimeSpan;
        /**
        * Gets or the Elapsed component of the tween.  Elapsed represents how far along the tween is.  When Elapsed equals Duration the tween is completed.
        */
        public Elapsed : EndGate.TimeSpan;
        /**
        * Gets or sets the TweeningFunction of the tween.  The TweeningFunction controls how the tween translates the Current value to the To value.
        */
        public TweeningFunction : Tweening.Functions.ITweeningFunction;
        /**
        * Determines if the tween is playing.
        */
        public IsPlaying(): boolean;
        /**
        * Starts playing the tween.  The tween will only start translating the value if Update is called.
        */
        public Play(): void;
        /**
        * Pauses the tween.  Calls to update will not translate the tween when paused.
        */
        public Pause(): void;
        /**
        * Resets the tween to the To location and resets the Elapsed time.  This does not stop or start the tween.
        */
        public Reset(): void;
        /**
        * Stops the tween from playing.  This also resets the tween to its To value.
        */
        public Stop(): void;
        /**
        * Restarts the tween.  Essentially calls Reset and then Play.
        */
        public Restart(): void;
        /**
        * Reverses the tween from the Current value back to the From value.  This changes the To component to equal the From value and the From value to equal the Current value.
        */
        public Reverse(): void;
        /**
        * Updates the tweens Current and Elapsed component if the tween is playing.
        * @param gameTime The global game time object.  Used to represent total time running and used to track update interval elapsed speeds.
        */
        public Update(gameTime: EndGate.GameTime): void;
        /**
        * Stops and unbinds all events from the tween.
        */
        public Dispose(): void; 
    }
}
declare module EndGate.Tweening {
    /**
    * Defines a Vector2dTween class that is used to move a Vector2d from a start value to an end value.
    */
    class Vector2dTween extends Tweening.Tween<EndGate.Vector2d> {
        /**
        * Creates a new instance of the Vector2dTween object.
        * @param from Start Vector2d.
        * @param to End Vector2d.
        * @param duration How fast to move the current Vector2d from start to end.
        * @param tweeningFunction The function to use to translate the current Vector2d from start to end.  Different functions result in different translation behavior.
        */
        constructor(from: EndGate.Vector2d, to: EndGate.Vector2d, duration: EndGate.TimeSpan, tweeningFunction: Tweening.Functions.ITweeningFunction); 
    }
}
declare module EndGate.Tweening {
    /**
    * Defines a NumberTween class that is used to move a number from a start value to an end value.
    */
    class NumberTween extends Tweening.Tween<number> {
        /**
        * Creates a new instance of the NumberTween object.
        * @param from Start number.
        * @param to End number.
        * @param duration How fast to move the current number from start to end.
        * @param tweeningFunction The function to use to translate the current number from start to end.  Different functions result in different translation behavior.
        */
        constructor(from: number, to: number, duration: EndGate.TimeSpan, tweeningFunction: Tweening.Functions.ITweeningFunction); 
    }
}
declare module EndGate.Particles {
    /**
    * Defines a particle that abides by several configured values.
    */
    class Particle implements EndGate.IUpdateable {            
        /**
        * Creates a new instance of the Particle object.
        * @param texture The texture for the particle.
        * @param fromLocation The from location of the Particle.
        * @param toLocation The end location of the Particle.
        * @param scale How large the Particles Texture should be.  Value will multiply the size of the provided texture.
        * @param opacity The particles opacity.  Value should be between 0 and 1.
        * @param rotation The particles initial rotation.  Value should be in radians.
        * @param rotationSpeed How fast the particle should rotate.  Value should be X radians per second.
        * @param lifetime How long the particle should live before dying.
        * @param fadeInDuration How long the particle should take to fade in.
        * @param fadeOutDuration How long the particle should take to fade out.
        * @param movementFunction The function to use to move from the 'fromLocation' to the 'toLocation'.
        */
        constructor(texture: EndGate.Graphics.Graphic2d, fromLocation: EndGate.Vector2d, toLocation: EndGate.Vector2d, scale: number, opacity: number, rotation: number, rotationSpeed: number, lifetime: EndGate.TimeSpan, fadeInDuration: EndGate.TimeSpan, fadeOutDuration: EndGate.TimeSpan, movementFunction: EndGate.Tweening.Functions.ITweeningFunction);
        /**
        * Gets the particles texture.
        */
        public Texture : EndGate.Graphics.Graphic2d;
        /**
        * Gets an event that is triggered when the particle dies.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public OnDeath : EndGate.EventHandler1<Particle>;
        /**
        * Determines if the particle is alive.
        */
        public IsAlive(): boolean;
        /**
        * Makes the particle move, fade, and even die if needed.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: EndGate.GameTime): void;
    }
}
declare module EndGate.Particles {
    /**
    * Defines a particle emitter that can emit particles based on various configurations.
    */
    class Emitter extends EndGate.Graphics.Graphic2d implements EndGate.IUpdateable {      
        /**
        * Gets or sets the EmissionFunction.  The EmissionFunction is used to control how emitted particles move once emitted.
        */
        public EmissionFunction: EndGate.Tweening.Functions.ITweeningFunction;
        /**
        * Gets or sets the EmissionInterval.  The EmissionInterval is used to control how often particles are emitted.
        */
        public EmissionInterval: Particles.Range<EndGate.TimeSpan>;
        /**
        * Gets or sets the EmissionDirection.  The EmissionDirection is used to control the angle of particle emissions.  This angle value should be in radians.
        */
        public EmissionDirection: Particles.Range<number>;
        /**
        * Gets or sets the EmissionOutput.  The EmissionOutput is used to control how many particles should be emitted per emission.
        */
        public EmissionOutput: Particles.Range<number>;
        /**
        * Gets or sets the ParticleLifetime.  The ParticleLifetime is used to control how long particles live before dying out.
        */
        public ParticleLifetime: Particles.Range<EndGate.TimeSpan>;
        /**
        * Gets or sets the ParticleSpeed.  The ParticleSpeed is used to control the average speed that emitted particles will move at during their lifetime.
        */
        public ParticleSpeed: Particles.Range<number>;
        /**
        * Gets or sets the ParticleScale.  The ParticleScale is used to control each particles size.  Values are percentages of particles base sizes.
        */
        public ParticleScale: Particles.Range<number>;
        /**
        * Gets or sets the ParticleRotation.  The ParticleRotation is used to control the initial rotation of emitted particles.
        */
        public ParticleRotation: Particles.Range<number>;
        /**
        * Gets or sets the ParticleRotationSpeed.  The ParticleRotationSpeed is used to control how quickly emitted particles rotate.  Values should indicate X number of radians per second.
        */
        public ParticleRotationSpeed: Particles.Range<number>;
        /**
        * Gets or sets the ParticleOpacity.  The ParticleOpacity is used to control emitted particles opacity.  Values should be between 0 and 1.
        */
        public ParticleOpacity: Particles.Range<number>;
        /**
        * Gets or sets the ParticleFadeInDuration.  The ParticleFadeInDuration is used to control how long particles take to fade in.
        */
        public ParticleFadeInDuration: Particles.Range<EndGate.TimeSpan>;
        /**
        * Gets or sets the ParticleFadeOutDuration.  The ParticleFadeOutDuration is used to control how long particles take to fade out.
        */
        public ParticleFadeOutDuration: Particles.Range<EndGate.TimeSpan>;
        /**
        * Creates a new instance of the Emitter object.
        * @param x The initial horizontal location of the Emitter.
        * @param y The initial vertical location of the Emitter.
        * @param emissionFunction The initial EmissionFunction to use for particle control.
        */
        constructor(x: number, y: number, emissionFunction: EndGate.Tweening.Functions.ITweeningFunction);
        /**
        * Determines if the Emitter is emitting particles.
        */
        public IsEmitting(): boolean;
        /**
        * Starts the Emitter.  Update must be called once started to begin auto-emission of particles.
        */
        public Start(): void;
        /**
        * Stops the Emitter, no particles will be emitted while stopped.
        */
        public Stop(): void;
        /**
        * Adds a texture to the Emitters texture pool.
        * @param texture The texture to add to the pool.
        */
        public AddTexture(texture: EndGate.Graphics.Graphic2d): void;
        /**
        * Adds a texture to the Emitters texture pool with the provided weight.
        * @param texture The texture to add to the pool.
        * @param weight The weight of the provided texture. A texture with weight 2 will be emitted two times more than a texture with weight 1.
        */
        public AddTexture(texture: EndGate.Graphics.Graphic2d, weight: number): void;
        /**
        * Removes the provided texture from the texture pool.
        * @param texture The texture to remove from the pool.
        */
        public RemoveTexture(texture: EndGate.Graphics.Graphic2d): void;
        /**
        * Emits particles based on the Emitters configuration.  Does not abide by the EmissionInterval.
        * To allow for complex particle manipulation this method can be overridden by derived Emitter classes.
        */
        public Emit(): Particles.Particle[];
        /**
        * Draws the Emitter onto the given context.  If this Emitter is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the Emitter onto.
        */
        public Draw(context: CanvasRenderingContext2D): void;
        /**
        * Scale is not implemented.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void;
        /**
        * Attempts to emit particles if the configured EmisisonInterval has passed since the last Emission.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: EndGate.GameTime): void;
        /**
        * The bounding area that represents where the Emitter will draw.
        */
        public GetDrawBounds(): EndGate.Bounds.Bounds2d;
        /**
        * Returns a nearly identical copy of this Emitter.  The cloned Emitter will be stopped.  If this Emitter belongs to a parent, the cloned Emitter will not. The cloned Emitter will not have the same event bindings as this one does.
        */
        public Clone(): Emitter; 
    }
}
declare module EndGate.Tweening {
    /**
    * Defines a ColorTween class that is used to move a number from a start value to an end value.
    */
    class ColorTween extends Tweening.Tween<EndGate.Graphics.Color> {
        /**
        * Creates a new instance of the ColorTween object.
        * @param from Start color.
        * @param to End color.
        * @param duration How fast to move the current color from start to end.
        * @param tweeningFunction The function to use to translate the current color from start to end.  Different functions result in different translation behavior.
        */
        constructor(from: EndGate.Graphics.Color, to: EndGate.Graphics.Color, duration: EndGate.TimeSpan, tweeningFunction: Tweening.Functions.ITweeningFunction); 
    }
}
declare module EndGate.Tweening {
    /**
    * Defines a Size2dTween class that is used to move a Size2d from a start value to an end value.
    */
    class Size2dTween extends Tweening.Tween<EndGate.Size2d> {
        /**
        * Creates a new instance of the Size2dTween object.
        * @param from Start Size2d.
        * @param to End Size2d.
        * @param duration How fast to move the current Size2d from start to end.
        * @param tweeningFunction The function to use to translate the current Size2d from start to end.  Different functions result in different translation behavior.
        */
        constructor(from: EndGate.Size2d, to: EndGate.Size2d, duration: EndGate.TimeSpan, tweeningFunction: Tweening.Functions.ITweeningFunction); 
    }
}
declare module EndGate.Tweening.Functions {
    /**
    * Defines a Back tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    class Back {   
        /**
        * Gets the Back EaseIn function.
        */
        static EaseIn : Functions.ITweeningFunction;
        /**
        * Gets the Back EaseOut function.
        */
        static EaseOut : Functions.ITweeningFunction;
        /**
        * Gets the Back EaseInOut function.
        */
        static EaseInOut : Functions.ITweeningFunction;
    }
}
declare module EndGate.Tweening.Functions {
    /**
    * Defines a Bounce tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    class Bounce {   
        /**
        * Gets the Bounce EaseIn function.
        */
        static EaseIn : Functions.ITweeningFunction;
        /**
        * Gets the Bounce EaseOut function.
        */
        static EaseOut : Functions.ITweeningFunction;
        /**
        * Gets the Bounce EaseInOut function.
        */
        static EaseInOut : Functions.ITweeningFunction;
    }
}
declare module EndGate.Tweening.Functions {
    /**
    * Defines a Circular tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    class Circular {   
        /**
        * Gets the Circular EaseIn function.
        */
        static EaseIn : Functions.ITweeningFunction;
        /**
        * Gets the Circular EaseOut function.
        */
        static EaseOut : Functions.ITweeningFunction;
        /**
        * Gets the Circular EaseInOut function.
        */
        static EaseInOut : Functions.ITweeningFunction;
    }
}
declare module EndGate.Tweening.Functions {
    /**
    * Defines a Cubic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    class Cubic {   
        /**
        * Gets the Cubic EaseIn function.
        */
        static EaseIn : Functions.ITweeningFunction;
        /**
        * Gets the Cubic EaseOut function.
        */
        static EaseOut : Functions.ITweeningFunction;
        /**
        * Gets the Cubic EaseInOut function.
        */
        static EaseInOut : Functions.ITweeningFunction;
    }
}
declare module EndGate.Tweening.Functions {
    /**
    * Defines an Elastic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    class Elastic {   
        /**
        * Gets the Elastic EaseIn function.
        */
        static EaseIn : Functions.ITweeningFunction;
        /**
        * Gets the Elastic EaseOut function.
        */
        static EaseOut : Functions.ITweeningFunction;
        /**
        * Gets the Elastic EaseInOut function.
        */
        static EaseInOut : Functions.ITweeningFunction;
    }
}
declare module EndGate.Tweening.Functions {
    /**
    * Defines an Exponential tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    class Exponential {   
        /**
        * Gets the Exponential EaseIn function.
        */
        static EaseIn : Functions.ITweeningFunction;
        /**
        * Gets the Exponential EaseOut function.
        */
        static EaseOut : Functions.ITweeningFunction;
        /**
        * Gets the Exponential EaseInOut function.
        */
        static EaseInOut : Functions.ITweeningFunction;
    }
}
declare module EndGate.Tweening.Functions {
    /**
    * Defines a Quadratic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    class Quadratic {   
        /**
        * Gets the Quadratic EaseIn function.
        */
        static EaseIn : Functions.ITweeningFunction;
        /**
        * Gets the Quadratic EaseOut function.
        */
        static EaseOut : Functions.ITweeningFunction;
        /**
        * Gets the Quadratic EaseInOut function.
        */
        static EaseInOut : Functions.ITweeningFunction;
    }
}
declare module EndGate.Tweening.Functions {
    /**
    * Defines a Quartic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    class Quartic {   
        /**
        * Gets the Quartic EaseIn function.
        */
        static EaseIn : Functions.ITweeningFunction;
        /**
        * Gets the Quartic EaseOut function.
        */
        static EaseOut : Functions.ITweeningFunction;
        /**
        * Gets the Quartic EaseInOut function.
        */
        static EaseInOut : Functions.ITweeningFunction;
    }
}
declare module EndGate.Tweening.Functions {
    /**
    * Defines a Quintic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    class Quintic {   
        /**
        * Gets the Quintic EaseIn function.
        */
        static EaseIn : Functions.ITweeningFunction;
        /**
        * Gets the Quintic EaseOut function.
        */
        static EaseOut : Functions.ITweeningFunction;
        /**
        * Gets the Quintic EaseInOut function.
        */
        static EaseInOut : Functions.ITweeningFunction;
    }
}
declare module EndGate.Tweening.Functions {
    /**
    * Defines a Sinusoidal tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    class Sinusoidal {   
        /**
        * Gets the Sinusoidal EaseIn function.
        */
        static EaseIn : Functions.ITweeningFunction;
        /**
        * Gets the Sinusoidal EaseOut function.
        */
        static EaseOut : Functions.ITweeningFunction;
        /**
        * Gets the Sinusoidal EaseInOut function.
        */
        static EaseInOut : Functions.ITweeningFunction;
    }
}
declare module EndGate {
    /**
    * Defines a type constrained event handler object that can maintain bound functions which take in a value T, U and V and trigger them on demand.
    */
    class EventHandler3<T, U, V> implements EndGate.IDisposable {  
        /**
        * Creates a new instance of the EventHandler3 object.
        */
        constructor();
        /**
        * Binds the provided action to the EventHandler3.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler3 Trigger.
        */
        public Bind(action: (val1: T, val2: U, val3: V) => any): void;
        /**
        * Binds the provided action to the EventHandler3 for the specified number of triggers.  Once all triggers have been fired the action will unbind itself.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler3 Trigger.
        * @param triggerCount Number of triggers to wait before unbinding the action.
        */
        public BindFor(action: (val1: T, val2: U, val3: V) => any, triggerCount: number): void;
        /**
        * Unbinds the provided action from the EventHandler3.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        public Unbind(action: (val1: T, val2: U, val3: V) => any): void;
        /**
        * Determines if the EventHandler3 has active bindings.
        */
        public HasBindings(): boolean;
        /**
        * Executes all bound functions and passes the provided args to each.
        * @param val1 The first argument to pass to the bound functions.
        * @param val2 The second argument to pass to the bound functions.
        * @param val3 The third argument to pass to the bound functions.
        */
        public Trigger(val1: T, val2: U, val3: V): void;
        /**
        * Disposes the event handler and unbinds all bound events.
        */
        public Dispose(): void;
    }
}
import eg = EndGate;
