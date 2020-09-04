precision mediump float;
uniform vec4 u_color;
uniform vec3 u_ambient_light;
uniform sampler2D u_diffuse;
uniform mat4 u_projection;
uniform sampler2D u_normalMap;
uniform mat4 u_model;

uniform vec3 u_point_light_positions[16];
uniform vec4 u_point_light_color[16];

varying vec2 v_texCoord;
varying vec3 v_normalVector;
varying vec3 v_fragPos;

void main(){
	vec3 light = vec3(u_ambient_light);
	vec3 normalColor = (vec3(texture2D(u_normalMap, v_texCoord)) - vec3(1.0, 1.0, 0.0)) * vec3(2.0, 2.0, 1.0);
	//gl_FragColor = vec4(v_normalVector + normalColor, 1.0);
	//return;
	//gl_FragColor = vec4(normalColor, 1.0);
	//return;
	vec3 normalVector = normalize(mat3(u_model) * (v_normalVector + normalColor));

	for (int i = 0; i < 16; i++){
		vec3 lightPos = u_point_light_positions[i];

		vec4 lightColor = u_point_light_color[i];
		float lightIntensity = lightColor.w;
		float lightDistance = distance(lightPos, v_fragPos);
		vec3 lightVector = normalize(lightPos - v_fragPos);
		float normalDiff = max(dot(normalVector, lightVector), 0.0);

		if (lightDistance < lightIntensity){
			//lightIntensity = ((lightIntensity - lightDistance) / lightIntensity)  * (1.0 - abs(normalDiff));
			lightIntensity = 1.0 - normalDiff;
			if (lightIntensity > 0.0){
				vec3 lightAdd = vec3(lightColor.xyz) * vec3(lightIntensity);
				light += lightAdd;
			}
		}
	}
	

	gl_FragColor = vec4(light, 1.0) * u_color * texture2D(u_diffuse, v_texCoord);
	if (gl_FragColor.w == 0.0){
		discard;
	}
}