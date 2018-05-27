const VALIDATOR= Symbol( 'validator', );
const PAGE= Symbol( 'page', );

export default class Gate
{
	constructor( validator, page, )
	{
		this[VALIDATOR]= validator;
		this[PAGE]= page;
	}
	
	validate()
	{
		return this[VALIDATOR]();
	}
	
	get page()
	{
		return this[PAGE];
	}
}
