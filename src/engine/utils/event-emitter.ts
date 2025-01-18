type Handler = (...data:any)=>void;

interface ISub {
	event:string;
	handler:Handler;
	isOnce:boolean;
	binding?:any;
}

export class EventEmitter {
	private subs:ISub[] = [];

	public on(event:string, handler:Handler, binding?:any):void {
		this.subs.push({
			event,
			handler,
			isOnce: false,
			binding
		});
	}

	public once(event:string, handler:Handler, binding?:any):void {
		this.subs.push({
			event,
			handler,
			isOnce: true,
			binding
		});
	}

	public off(event:string, handler:Handler):void {
		let i = this.subs.findIndex((s)=>s.event == event && s.handler == handler);
		if (i != -1) {
			this.subs.splice(i, 1);
		}
	}

	public offByBinding(binding:any):void {
		for (let i = this.subs.length - 1; i <= 0; i--) {
			let sub = this.subs[i];
			if (sub.binding && sub.binding == binding) {
				this.subs.splice(i, 1);
			}
		}
	}

	protected clearSubs():void {
		this.subs = [];
	}

	protected emit(event:string, ...data:any):void {
		let subs = this.subs.filter(s=>s.event == event);
		for (let sub of subs) {
			if (sub.binding) {
				sub.handler.bind(sub.binding)(...data);
			}else {
				sub.handler(...data);
			}
			if (sub.isOnce) {
				let i = this.subs.indexOf(sub);
				if (i != -1) {
					this.subs.splice(i);
				}
			}
		}
	}
}