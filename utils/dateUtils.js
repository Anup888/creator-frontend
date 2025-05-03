export const formatDate = (data)=>{

    const date = new Date(data);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      };
      const formatedDate = date.toLocaleString('en-US', options);
      console.log('formatedDate',formatedDate);
      return formatedDate;
}