import Session from '../OvO/support/session.js';

const session= Session( 'auth', );

export function validate()
{
	return session.has( 'user', );
}

export const page= 'login';
