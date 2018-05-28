import Request from './Request.js';

export default class FormAction extends Request
{
	request( form, )
	{
		const method= (form.getAttribute( 'method', )||'').toUpperCase() || this.method;
		
		let body;
		switch( form.encoding )
		{
			case 'application/x-www-form-urlencoded':
				body= `${new URLSearchParams( new FormData( form, ), )}`;
			break;
			
			case 'multipart/form-data':
				body= new FormData( form, );
			break;
		}
		
		return fetch(
			this.url,
			{
				method,
				headers: {
					'Content-Type': form.encoding,
				},
				body: body,
			},
		);
	}
}
