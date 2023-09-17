import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}
	return data;
}

export async function createEditCabin(newCabin, id) {
	console.log(newCabin, id)
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
	const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	//1.Create/Edit cabin

	let query = supabase.from("cabins");

	// A) If there is no id, it means we are creating a new cabin
	if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

	// B) If there is an id, it means we are editing an existing cabin
	if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

	const { data, error } = await query.select().single();

	// Check if there is an error
	if (error) {
		console.error(error);
		throw new Error("Cabin could not be created");
	}
	//2. If no Error Upload image

	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image);
	//3. Delete the cabin if there was an error uploading the image
	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data[0].id);
		console.error(storageError);
		throw new Error("Cabin image could not by uploaded and the cabin was not created");
	}
	return data;
}

export async function deleteCabin(id) {
	const { error } = await supabase.from("cabins").delete().eq("id", id);
	if (error) {
		console.error(error);
		throw new Error("Cabin could not be deleted");
	}
}
