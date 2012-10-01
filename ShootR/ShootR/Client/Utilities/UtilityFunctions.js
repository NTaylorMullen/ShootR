 function CalculatePO(from, time) {
     var diff = new Date();
     diff.setTime(diff - from);
     return (diff.getTime() / time);
 }

 function CalculatePOS(from) {
     return CalculatePO(from, 1000);
 }

 function calculateLength(A, B) {
     return Math.sqrt(Math.pow(A.X - B.X, 2) + Math.pow(A.Y - B.Y, 2));
 }

 function calculateDistance(A, B) {
     return { X: Math.abs(B.X - A.X), Y: Math.abs(B.Y - A.Y) };
 }