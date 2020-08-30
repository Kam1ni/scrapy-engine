function mathMap(x:number, xMin:number, xMax:number, yMin:number, yMax:number){
	return (x - xMin) / (xMax - xMin) * (yMax - yMin) + yMin;
}