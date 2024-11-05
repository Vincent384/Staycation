

export function validateCreate(form:CreateListingProperty,
    setError:React.Dispatch<React.SetStateAction<CreateListingPropertyErrors>>):boolean{
        let isValid = true;

        // Exempel på validering
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

          if (form.images.map((bild) => bild === '')) {
            setError(prev => ({ ...prev, images:'Måste ha en bild på huset' }));
            isValid = false;
          }
      
          if (!form.location.adress || form.location.adress.trim() === '') {
            setError(prev => ({ ...prev, description: 'En adress behövs' }));
            isValid = false;
          }

          if (!form.description || form.description.trim() === '') {
            setError(prev => ({ ...prev, description: 'Beskrivning på huset' }));
            isValid = false;
          }

        if (form.price_per_night as string === '') {
          setError(prev => ({ ...prev, price: 'Priset måste vara större än 0' }));
          isValid = false;
        }
      
        return isValid;
}