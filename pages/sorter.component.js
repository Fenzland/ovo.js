import HTML from '../OvO/view/HTML.js';
import Listener from '../OvO/view/Listener.js';

// TODO new Component() and use Web Standard Component.
export default function sorter( array, field, )
{
	return [
		' ',
		HTML.div(
			{
				style: /*CSS{}*/`
					display: inline-block;
					position: relative;
					height: 1em;
					vertical-align: bottom;
				`,
			},
			HTML.button(
				{
					style: /*CSS{}*/`
						position: absolute;
						top: -0.25em;
						width: 0;
						height: 0;
						padding: 0;
						border-width: 0 0.5em 0.7em;
						border-color: var(--fgc) transparent;
						background-color: transparent;
						opacity: 0.5;
					`,
					tabindex: -1,
				},
				new Listener( 'click', e=> array.sort( ( x, y, )=> compare( x[field], y[field], ), ), ),
			),
			HTML.button(
				{
					style: /*CSS{}*/`
						position: absolute;
						bottom: -0.25em;
						width: 0;
						height: 0;
						padding: 0;
						border-width: 0.7em 0.5em 0;
						border-color: var(--fgc) transparent;
						background-color: transparent;
						opacity: 0.5;
					`,
					tabindex: -1,
				},
				new Listener( 'click', e=> array.sort( ( x, y, )=> compare( y[field], x[field], ), ), ),
			),
		),
		' ',
	];
}

function compare( x, y, )
{
	if( isNaN( x, ) || isNaN( y, ) )
	{
		return (
			`${x}`>`${y}` ? 1 :
			`${x}`<`${y}` ? -1 :
			0
		);
	}
	else
	{
		return x - y;
	}
}
