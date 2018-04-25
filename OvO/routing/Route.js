export default class Route
{
	constructor( pattern, page, )
	{
		this.pattern= pattern;
		this.page= page;
	}
	
	match( path, )
	{
		return path===this.pattern;
	}
}
