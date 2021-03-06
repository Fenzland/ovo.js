import Resource from '../OvO/model/Resource.js';
import { resolve, } from '../OvO/support/path.js';

export default class Planet extends Resource
{
	static makeFields()
	{
		return {
			id:                   { type:Number, label:'id',                    },
			name:                 { type:String, label:'name',                  },
			mass:                 { type:String, label:'mass',                  },
			diameter:             { type:String, label:'diameter',              },
			semi_major_axis:      { type:String, label:'semi-major axis',       },
			orbital_period:       { type:String, label:'orbital period',        },
			orbital_eccentricity: { type:String, label:'orbital eccentricity',  },
			rotation_period:      { type:String, label:'rotation period',       },
			moons:                { type:Number, label:'moons',                 },
		};
	}
	
	static query()
	{
		return this.makeSet(
			query(),
		);
	}
	
	static find( key, )
	{
		return this.makeInstance(
			query().then( data=> data.find( datum=> datum.id === key, ), ),
			{ id: 0,   name: 'Loading...', mass: '-', diameter: '-', semi_major_axis: '-', orbital_period: '-', orbital_eccentricity: '-', rotation_period: '-', moons: '-', },
			{ id: NaN, name: 'Not Find',   mass: '-', diameter: '-', semi_major_axis: '-', orbital_period: '-', orbital_eccentricity: '-', rotation_period: '-', moons: '-', },
		);
	}
}

Planet.boot();

function query()
{
	return fetch( resolve( '../data/planets.json', ), ).then( resp=> resp.json(), );
}
