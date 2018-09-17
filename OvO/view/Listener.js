const EVENT_NAME= Symbol( 'event_name', );
const CALLBACK= Symbol( 'callback', );

export default class Listener
{
	constructor( eventName, callback, )
	{
		if(!( callback instanceof Function ))
			throw 'The callback of Listener must be a function.';
		
		this[EVENT_NAME]= `${eventName}`;
		this[CALLBACK]= callback;
	}
	
	get eventName()
	{
		return this[EVENT_NAME];
	}
	
	get callback()
	{
		return this[CALLBACK];
	}
	
	listenTo( eventTarget, )
	{
		if(!( eventTarget instanceof EventTarget ))
			throw 'Must listen to a instance of EventTarget.';
		
		eventTarget.addEventListener( this[EVENT_NAME], this[CALLBACK], );
	}
}

export const onClick= callback=> new Listener( 'click', callback, );
export const onDbclick= callback=> new Listener( 'dbclick', callback, );
export const onSubmit= callback=> new Listener( 'submit', callback, );
export const onFocus= callback=> new Listener( 'focus', callback, );
export const onBlur= callback=> new Listener( 'blur', callback, );
export const onInput= callback=> new Listener( 'input', callback, );
