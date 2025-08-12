const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function AddDriver(data: {
    fullname:string;
    phone_number:string;
    driver_status:string | undefined;
    photo?: File;
}){
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("phone_number", data.phone_number);
    if(data.driver_status) formData.append("driver_status", data.driver_status);

    if(data.photo){
        formData.append("photo", data.photo);
    }

    try {
        const res = await fetch(`${baseUrl}/driver/add`, {
            method: 'POST',
            body: formData
        });

        const result = await res.json();

        if(!res.ok){
            throw new Error(result.message || "Gagal menambahkan supir");
        }

        return result;
    } catch (error) {
        console.error("Kesalahan saat request : ", error);
        throw error;
    }
}

export async function GetDriver(){
    try {
        const res = await fetch(`${baseUrl}/driver`);

        if(!res.ok){
            throw new Error(`HTTP error status : ${res.status}`)
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Kesalahan saat mengambil data supir : ", error);
        throw error;
    }
}

export async function DeleteDriver(driver_id:string){
    try {
        const res = await fetch(`${baseUrl}/driver/delete/${driver_id}`, {
            method: 'DELETE'
        })

        if(!res.ok){
            const errorData = await res.json();
            throw new Error(errorData.message || 'Gagal menghapus data supir');
        }

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Kesalahan saat mengambil data supir : ", error);
        throw error;
    }
}

export async function UpdateDriver(driver_id: string, data: {
  fullname: string;
  phone_number: string;
  driver_status?: string;
}) {
  try {
    const res = await fetch(`${baseUrl}/driver/edit/${driver_id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || 'Gagal mengupdate data supir');
    }

    return result;
  } catch (error) {
    console.error('Kesalahan saat request : ', error);
    throw error;
  }
}
