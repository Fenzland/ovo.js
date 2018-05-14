const themeCss= document.getElementById( 'theme-css', );

export const themes= [
	{ "name": "default",    "label": "Default",    "color": "hsla(0,0%,93%,1)",     "url": "/themes/default.css", },
	{ "name": "light_blue", "label": "Light Blue", "color": "hsla(205,100%,80%,1)", "url": "/themes/light-blue.css", },
	{ "name": "deep_blue",  "label": "Deep Blue",  "color": "hsla(205,80%,60%,1)",  "url": "/themes/deep-blue.css", },
];

export function switchTheme( theme, )
{
	if(!( themes.includes( theme, ) ))
		throw 'theme not exists';
	
	themeCss.href= theme.url;
}
