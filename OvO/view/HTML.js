import { create, } from './VDOM.js';

const Tags= {
	     header: ( ...args )=> create(     'header', ...args, ),
	       main: ( ...args )=> create(       'main', ...args, ),
	     footer: ( ...args )=> create(     'footer', ...args, ),
	        nav: ( ...args )=> create(        'nav', ...args, ),
	    section: ( ...args )=> create(    'section', ...args, ),
	    article: ( ...args )=> create(    'article', ...args, ),
	      aside: ( ...args )=> create(      'aside', ...args, ),
	        div: ( ...args )=> create(        'div', ...args, ),
	         h1: ( ...args )=> create(         'h1', ...args, ),
	         h2: ( ...args )=> create(         'h2', ...args, ),
	         h3: ( ...args )=> create(         'h3', ...args, ),
	         h4: ( ...args )=> create(         'h4', ...args, ),
	         h5: ( ...args )=> create(         'h5', ...args, ),
	         h6: ( ...args )=> create(         'h6', ...args, ),
	         h7: ( ...args )=> create(         'h7', ...args, ),
	         h8: ( ...args )=> create(         'h8', ...args, ),
	          p: ( ...args )=> create(          'p', ...args, ),
	        pre: ( ...args )=> create(        'pre', ...args, ),
	         dl: ( ...args )=> create(         'dl', ...args, ),
	         dt: ( ...args )=> create(         'dt', ...args, ),
	         dd: ( ...args )=> create(         'dd', ...args, ),
	       span: ( ...args )=> create(       'span', ...args, ),
	      small: ( ...args )=> create(      'small', ...args, ),
	       code: ( ...args )=> create(       'code', ...args, ),
	   fieldset: ( ...args )=> create(   'fieldset', ...args, ),
	     legend: ( ...args )=> create(     'legend', ...args, ),
	      label: ( ...args )=> create(      'label', ...args, ),
	      table: ( ...args )=> create(      'table', ...args, ),
	    caption: ( ...args )=> create(    'caption', ...args, ),
	      thead: ( ...args )=> create(      'thead', ...args, ),
	      tbody: ( ...args )=> create(      'tbody', ...args, ),
	         tr: ( ...args )=> create(         'tr', ...args, ),
	         th: ( ...args )=> create(         'th', ...args, ),
	         td: ( ...args )=> create(         'td', ...args, ),
	        img: ( ...args )=> create(        'img', ...args, ).empty(),
	   optgroup: ( ...args )=> create(   'optgroup', ...args, ),
	     option: ( ...args )=> create(     'option', ...args, ).empty(),
	         hr: ( ...args )=> create(         'hr', ...args, ).empty(),
	         br: ( ...args )=> create(         'br', ...args, ).empty(),
	        wbr: ( ...args )=> create(        'wbr', ...args, ).empty(),
	       abbr: ( ...args )=> create(       'abbr', ...args, ),
	    address: ( ...args )=> create(    'address', ...args, ),
	       area: ( ...args )=> create(       'area', ...args, ).empty(),
	      audio: ( ...args )=> create(      'audio', ...args, ),
	          b: ( ...args )=> create(          'b', ...args, ),
	       base: ( ...args )=> create(       'base', ...args, ).empty(),
	        bdi: ( ...args )=> create(        'bdi', ...args, ),
	        bdo: ( ...args )=> create(        'bdo', ...args, ),
	 blockquote: ( ...args )=> create( 'blockquote', ...args, ),
	     canvas: ( ...args )=> create(     'canvas', ...args, ),
	       cite: ( ...args )=> create(       'cite', ...args, ),
	        col: ( ...args )=> create(        'col', ...args, ).empty(),
	   colgroup: ( ...args )=> create(   'colgroup', ...args, ),
	   datalist: ( ...args )=> create(   'datalist', ...args, ),
	        del: ( ...args )=> create(        'del', ...args, ),
	    details: ( ...args )=> create(    'details', ...args, ),
	        dfn: ( ...args )=> create(        'dfn', ...args, ),
	     dialog: ( ...args )=> create(     'dialog', ...args, ),
	         em: ( ...args )=> create(         'em', ...args, ),
	      embed: ( ...args )=> create(      'embed', ...args, ).empty(),
	 figcaption: ( ...args )=> create( 'figcaption', ...args, ),
	     figure: ( ...args )=> create(     'figure', ...args, ),
	          i: ( ...args )=> create(          'i', ...args, ),
	     iframe: ( ...args )=> create(     'iframe', ...args, ),
	        ins: ( ...args )=> create(        'ins', ...args, ),
	        kbd: ( ...args )=> create(        'kbd', ...args, ),
	         li: ( ...args )=> create(         'li', ...args, ),
	       link: ( ...args )=> create(       'link', ...args, ).empty(),
	        map: ( ...args )=> create(        'map', ...args, ),
	       mark: ( ...args )=> create(       'mark', ...args, ),
	       menu: ( ...args )=> create(       'menu', ...args, ),
	   menuitem: ( ...args )=> create(   'menuitem', ...args, ),
	       meta: ( ...args )=> create(       'meta', ...args, ).empty(),
	      meter: ( ...args )=> create(      'meter', ...args, ),
	     object: ( ...args )=> create(     'object', ...args, ),
	         ol: ( ...args )=> create(         'ol', ...args, ),
	     output: ( ...args )=> create(     'output', ...args, ),
	      param: ( ...args )=> create(      'param', ...args, ).empty(),
	   progress: ( ...args )=> create(   'progress', ...args, ),
	          q: ( ...args )=> create(          'q', ...args, ),
	         rp: ( ...args )=> create(         'rp', ...args, ),
	         rt: ( ...args )=> create(         'rt', ...args, ),
	       ruby: ( ...args )=> create(       'ruby', ...args, ),
	          s: ( ...args )=> create(          's', ...args, ),
	       samp: ( ...args )=> create(       'samp', ...args, ),
	     script: ( ...args )=> create(     'script', ...args, ),
	     source: ( ...args )=> create(     'source', ...args, ).empty(),
	     strong: ( ...args )=> create(     'strong', ...args, ),
	      style: ( ...args )=> create(      'style', ...args, ),
	        sub: ( ...args )=> create(        'sub', ...args, ),
	    summary: ( ...args )=> create(    'summary', ...args, ),
	        sup: ( ...args )=> create(        'sup', ...args, ),
	       time: ( ...args )=> create(       'time', ...args, ),
	      title: ( ...args )=> create(      'title', ...args, ),
	      track: ( ...args )=> create(      'track', ...args, ).empty(),
	          u: ( ...args )=> create(          'u', ...args, ),
	         ul: ( ...args )=> create(         'ul', ...args, ),
	        var: ( ...args )=> create(        'var', ...args, ),
	      video: ( ...args )=> create(      'video', ...args, ),
	input: {
		hidden:   ( ...args )=> create( 'input', ...args, { type:'hidden', },         ).empty(),
		text:     ( ...args )=> create( 'input', ...args, { type:'text', },           ).empty(),
		search:   ( ...args )=> create( 'input', ...args, { type:'search', },         ).empty(),
		password: ( ...args )=> create( 'input', ...args, { type:'password', },       ).empty(),
		email:    ( ...args )=> create( 'input', ...args, { type:'email', },          ).empty(),
		url:      ( ...args )=> create( 'input', ...args, { type:'url', },            ).empty(),
		tel:      ( ...args )=> create( 'input', ...args, { type:'tel', },            ).empty(),
		number:   ( ...args )=> create( 'input', ...args, { type:'number', },         ).empty(),
		range:    ( ...args )=> create( 'input', ...args, { type:'range', },          ).empty(),
		radio:    ( ...args )=> create( 'input', ...args, { type:'radio', },          ).empty(),
		checkbox: ( ...args )=> create( 'input', ...args, { type:'checkbox', },       ).empty(),
		date:     ( ...args )=> create( 'input', ...args, { type:'date', },           ).empty(),
		month:    ( ...args )=> create( 'input', ...args, { type:'month', },          ).empty(),
		week:     ( ...args )=> create( 'input', ...args, { type:'week', },           ).empty(),
		time:     ( ...args )=> create( 'input', ...args, { type:'time', },           ).empty(),
		datetime: ( ...args )=> create( 'input', ...args, { type:'datetime-local', }, ).empty(),
		color:    ( ...args )=> create( 'input', ...args, { type:'color', },          ).empty(),
		file:     ( ...args )=> create( 'input', ...args, { type:'file', },           ).empty(),
		textarea: ( ...args )=> create( 'textarea', ...args, ),
		select:   ( ...args )=> create( 'select', ...args, ),
		keygen:   ( ...args )=> create( 'keygen', ...args, ).empty(),
	},
	button: (()=> {
		const button= ( ...args )=> create( 'button', ...args, { type:'button', }, );
		button.submit= createLinkTag( 'button', 'formaction', 'click', { type:'submit', }, );
		return button;
	})(),
	a: createLinkTag( 'a', 'href', 'click', ),
	form: createLinkTag( 'form', 'action', 'submit', ),
};

function createLinkTag( name, linkName, eventName, ...moreArgs )
{
	return ( ...args )=> {
		const vdom= create( name, ...args, ...moreArgs, );
		
		const link= vdom.getAttribute( linkName, );
		
		if( link instanceof Function )
			vdom.addListener( eventName, e=> {
				if( link.call( e.target, e, ) )
					e.preventDefault();
			} );
		
		return vdom;
	};
}

export default new Proxy( {}, {
	
	get( target, key, receiver, )
	{
		if( Tags.hasOwnProperty( key, ) )
			return Tags[key];
		else
			return ( ...args )=> create( key, ...args, );
	},
	
	apply( target, context, args, )
	{
		return create( ...args, );
	},
}, )

export const     header= Tags.header;
export const       main= Tags.main;
export const     footer= Tags.footer;
export const        nav= Tags.nav;
export const    section= Tags.section;
export const    article= Tags.article;
export const      aside= Tags.aside;
export const        div= Tags.div;
export const         h1= Tags.h1;
export const         h2= Tags.h2;
export const         h3= Tags.h3;
export const         h4= Tags.h4;
export const         h5= Tags.h5;
export const         h6= Tags.h6;
export const         h7= Tags.h7;
export const         h8= Tags.h8;
export const          p= Tags.p;
export const        pre= Tags.pre;
export const         dl= Tags.dl;
export const         dt= Tags.dt;
export const         dd= Tags.dd;
export const       span= Tags.span;
export const      small= Tags.small;
export const       code= Tags.code;
export const   fieldset= Tags.fieldset;
export const     legend= Tags.legend;
export const      label= Tags.label;
export const      table= Tags.table;
export const    caption= Tags.caption;
export const      thead= Tags.thead;
export const      tbody= Tags.tbody;
export const         tr= Tags.tr;
export const         th= Tags.th;
export const         td= Tags.td;
export const        img= Tags.img;
export const   optgroup= Tags.optgroup;
export const     option= Tags.option;
export const         hr= Tags.hr;
export const         br= Tags.br;
export const        wbr= Tags.wbr;
export const       abbr= Tags.abbr;
export const    address= Tags.address;
export const       area= Tags.area;
export const      audio= Tags.audio;
export const          b= Tags.b;
export const       base= Tags.base;
export const        bdi= Tags.bdi;
export const        bdo= Tags.bdo;
export const blockquote= Tags.blockquote;
export const     canvas= Tags.canvas;
export const       cite= Tags.cite;
export const        col= Tags.col;
export const   colgroup= Tags.colgroup;
export const   datalist= Tags.datalist;
export const        del= Tags.del;
export const    details= Tags.details;
export const        dfn= Tags.dfn;
export const     dialog= Tags.dialog;
export const         em= Tags.em;
export const      embed= Tags.embed;
export const figcaption= Tags.figcaption;
export const     figure= Tags.figure;
export const          i= Tags.i;
export const     iframe= Tags.iframe;
export const        ins= Tags.ins;
export const        kbd= Tags.kbd;
export const         li= Tags.li;
export const       link= Tags.link;
export const        map= Tags.map;
export const       mark= Tags.mark;
export const       menu= Tags.menu;
export const   menuitem= Tags.menuitem;
export const       meta= Tags.meta;
export const      meter= Tags.meter;
export const     object= Tags.object;
export const         ol= Tags.ol;
export const     output= Tags.output;
export const      param= Tags.param;
export const   progress= Tags.progress;
export const          q= Tags.q;
export const         rp= Tags.rp;
export const         rt= Tags.rt;
export const       ruby= Tags.ruby;
export const          s= Tags.s;
export const       samp= Tags.samp;
export const     script= Tags.script;
export const     source= Tags.source;
export const     strong= Tags.strong;
export const      style= Tags.style;
export const        sub= Tags.sub;
export const    summary= Tags.summary;
export const        sup= Tags.sup;
export const       time= Tags.time;
export const      title= Tags.title;
export const      track= Tags.track;
export const          u= Tags.u;
export const         ul= Tags.ul;
export const        VAR= Tags.var;
export const      video= Tags.video;
export const      input= Tags.input;
export const     button= Tags.button;
export const          a= Tags.a;
export const       form= Tags.form;
