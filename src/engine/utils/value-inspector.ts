export class ValueInspector{
	private static container:HTMLElement;

	private el:HTMLElement;
	private labelEl:HTMLElement;
	private valueEl:HTMLElement;
	private print:()=>string;
	private label:string;

	private static allInspectors:ValueInspector[] = [];

	constructor(label:string, print:()=>string){
		this.label = label;
		this.print = print;
		this.el = document.createElement("div");
		this.createLabel();
		this.createValue();
		ValueInspector.createContainer();
		ValueInspector.container.append(this.el);
		ValueInspector.allInspectors.push(this);
	}


	public destroy(){
		this.el.remove();
		ValueInspector.destroyContainer();
		let i = ValueInspector.allInspectors.indexOf(this);
		if (i != -1){
			ValueInspector.allInspectors.splice(i, 1);
		}
	}

	public update():void{
		this.valueEl.innerHTML = this.print();
	}

	public static update():void{
		for (let vi of ValueInspector.allInspectors){
			vi.update();
		}
	}

	private createLabel():void{
		this.labelEl = document.createElement("span");
		this.labelEl.innerHTML = this.label;
		this.el.append(this.labelEl)
	}

	private createValue():void{
		this.valueEl = document.createElement("span");
		this.el.append(this.valueEl);
	}

	private static createContainer():void{
		if (ValueInspector.container) return;
		console.log("CREATING CONTAINER")
		ValueInspector.container = document.createElement("div");
		ValueInspector.container.style.position = "absolute";
		ValueInspector.container.style.top = "0"
		ValueInspector.container.style.left = "0"
		ValueInspector.container.style.width = "100vw";
		ValueInspector.container.style.color = "white";
		ValueInspector.container.style.backgroundColor = "black";
		ValueInspector.container.style.padding = "5px";
		ValueInspector.container.style.fontFamily = "sans-serif";
		ValueInspector.container.style.fontSize = "20px";
		ValueInspector.container.className = "scrapy-value-inspector-container"
		document.body.append(ValueInspector.container);
	}

	private static destroyContainer():void{
		if (ValueInspector.container.hasChildNodes) return;
		ValueInspector.container.remove();
	}
}