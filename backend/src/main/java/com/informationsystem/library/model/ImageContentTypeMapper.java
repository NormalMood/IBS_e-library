package com.informationsystem.library.model;

import java.util.Map;
import static java.util.Map.entry;

public class ImageContentTypeMapper {
	
	public static final Map<String, String> contentTypeToFileExtension = Map.ofEntries(
		entry("image/jpeg", ".jpg"),
		entry("image/png", ".png")
	);

}
