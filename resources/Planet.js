import Resource from '../OvO/model/Resource.js';
import { resolveHere, } from '../OvO/support/path.js';

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
			fetch( resolveHere( '../data/planets.json', ), ).then( resp=> resp.json(), ),
		);
	}
}

Planet.boot();
