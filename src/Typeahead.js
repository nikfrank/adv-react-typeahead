import React, { useState } from 'react';

import countries from './countries';

const insensitiveIncludes = (base, search)=>
  base.toUpperCase().includes( search.toUpperCase() );

const Typeahead = ({ value, onChange })=> {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='Typeahead'>
      <input value={value}
             onFocus={()=> setMenuOpen(true)}
             onBlur={()=> setTimeout(()=> setMenuOpen(false), 100)}
             onChange={e=> onChange(e.target.value)} />
      {
        !value ? null : (
          <ul className={'country-options '+(menuOpen ? 'open' : 'closed')}>
            {
              [...countries]
                // .filter(country => ~country.name.toUpperCase()
                //                   .indexOf(value.toUpperCase()))
                .sort((a, b)=> {

                  const aLongestMatch =
                    [...Array(value.length)].reduce((biggestMatch, _, i)=>(
                      insensitiveIncludes( a.name, value.slice(0, i+1)) ?
                        i+1 : biggestMatch
                    ), 0);

                  const bLongestMatch =
                    [...Array(value.length)].reduce((biggestMatch, _, i)=>(
                      insensitiveIncludes( b.name, value.slice(0, i+1)) ?
                        i+1 : biggestMatch
                    ), 0);

                  return (
                    - aLongestMatch / a.name.length
                    + bLongestMatch / b.name.length
                  );
                })
                .slice(0, 3)
                .map(({ name })=> (
                  <li key={name} onClick={()=> onChange(name)}>
                    {name}
                  </li>
                ))
            }
          </ul>
        )
      }
    </div>
  );
};

export default Typeahead;
