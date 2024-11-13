

export function validateCreate(form:CreateListingProperty | ChangeListingProperty,
    setError:React.Dispatch<React.SetStateAction<CreateListingPropertyErrors>>):boolean{
        let isValid = true;

        if (!form.title || form.title.trim() === '') {
          setError(prev => ({ ...prev, title: 'Titel är obligatorisk' }));
          isValid = false;
        }

        if (!form.description || form.description.trim() === '') {
            setError(prev => ({ ...prev, description: 'Beskrivning på huset' }));
            isValid = false;
          }

          if (form.description.length <= 10) {
            setError(prev => ({ ...prev, description: 'Minst tio bokstäver' }));
            isValid = false;
          }

          if (form.images.some((bild) => bild === '')) {
            setError(prev => ({ ...prev, images:'Måste ha en bild på huset' }));
            isValid = false;
          }
      
          if (!form.location.adress || form.location.adress.trim() === '') {
            setError(prev => ({ ...prev, location:{
              ...prev.location,adress:'En adress behövs'
            } }));
            isValid = false;
          }

          if (!form.location.city || form.location.city.trim() === '') {
            setError(prev => ({ ...prev, location:{
              ...prev.location,city:'En Stad behövs'
            } }));
            isValid = false;
          }

          if (!form.location.district || form.location.district.trim() === '') {
            setError(prev => ({ ...prev, location:{
              ...prev.location,district:'En Kommun behövs'
            } }));
            isValid = false;
          }

          if (!form.description || form.description.trim() === '') {
            setError(prev => ({ ...prev, description: 'Beskrivning på huset' }));
            isValid = false;
          }

          if (
            form.price_per_night === '' || 
            form.price_per_night == null || 
            (typeof form.price_per_night === 'number' && form.price_per_night <= 0) || 
            (typeof form.price_per_night === 'string' && isNaN(Number(form.price_per_night))) 
          ) {
            setError(prev => ({ ...prev, price_per_night: 'Priset måste vara större än 0' }));
            isValid = false;
          }

          
          if (!form.maximum_guest || form.maximum_guest.trim() === '') {
            setError(prev => ({ ...prev, maximum_guest: 'Antal gäster behövs' }));
            isValid = false;
          }

          if (!form.available_dates || form.available_dates.some((datum) => (datum === ''))) {
            setError(prev => ({ ...prev, available_dates: 'Måste ange datum' }));
            isValid = false;
          }

          if (!form.house_rules || form.house_rules.some((datum) => (datum === ''))) {
            setError(prev => ({ ...prev, house_rules: 'Behöver regler' }));
            isValid = false;
          }


        return isValid;
}