import Component from '../OvO/view/Component.js';
import HTML from '../OvO/view/HTML.js';
import Listener from '../OvO/view/Listener.js';

export default new Component( {
	
	name: 'table-sorter',
	
	template( array, field, )
	{
		return [
			' ',
			HTML.main(
				HTML.button(
					{
						class: 'up',
						tabindex: -1,
					},
					new Listener( 'click', e=> array.sort( ( x, y, )=> compare( x[field], y[field], ), ), ),
				),
				HTML.button(
					{
						class: 'down',
						tabindex: -1,
					},
					new Listener( 'click', e=> array.sort( ( x, y, )=> compare( y[field], x[field], ), ), ),
				),
			),
			' ',
		];
	},
	
	styles: /*CSS*/`
		main
		{
			display: inline-block;
			position: relative;
			width: 1em;
			height: 1em;
			vertical-align: bottom;
		}
		
		button
		{
			position: absolute;
			width: 0;
			height: 0;
			padding: 0;
			border-left-width: 0.5em;
			border-right-width: 0.5em;
			border-style:solid;
			border-color: var(--fgc) transparent;
			background-color: transparent;
			font: inherit;
			opacity: 0.5;
		}
		
		button.up
		{
			top: -0.25em;
			border-top-width: 0;
			border-bottom-width: 0.7em;
		}
		
		button.down
		{
			bottom: -0.25em;
			border-bottom-width: 0;
			border-top-width: 0.7em;
		}
		
		:focus
		{ outline: none; }
	`,
	
	isEmpty: true,
}, );

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
