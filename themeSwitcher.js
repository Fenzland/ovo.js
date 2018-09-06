import Storage from './OvO/support/Storage.js';

const themeCss= document.getElementById( 'theme-css', );
const themeMeta= document.querySelector( 'meta[name=theme-color]', );
const storage= new Storage( localStorage, 'theme', );

export const themes= [
	{ "name": "default",    "label": "Default",    "color": "hsla(0,0%,93%,1)",     "url": "/themes/default.css",    },
	{ "name": "light_blue", "label": "Light Blue", "color": "hsla(205,100%,80%,1)", "url": "/themes/light-blue.css", },
	{ "name": "deep_blue",  "label": "Deep Blue",  "color": "hsla(205,80%,60%,1)",  "url": "/themes/deep-blue.css",  },
	{ "name": "warm",       "label": "Warm",       "color": "hsla(45,62%,66%,1)",   "url": "/themes/warm.css",       },
	{ "name": "green",      "label": "Green",      "color": "hsla(120,62%,66%,1)",  "url": "/themes/green.css",      },
	{ "name": "berry",      "label": "Berry",      "color": "hsla(330,100%,72%,1)", "url": "/themes/berry.css",      },
];

export function switchTheme( theme, )
{
	if( typeof theme === 'string' )
		theme= themes.find( x=> x.name===theme, );
	
	if(!( themes.includes( theme, ) ))
		throw 'theme not exists';
	
	themeCss.href= theme.url;
	themeMeta.content= theme.color;
	storage.set( 'theme', theme.name, );
}

if( storage.has( 'theme', ) )
	switchTheme( storage.get( 'theme', ), );
