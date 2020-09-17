#version 300 es

precision mediump float;

uniform vec4 u_color;
uniform vec3 u_ambient_light;
uniform sampler2D u_diffuse;
uniform mat4 u_projection;
uniform mat4 u_model;

uniform vec3 u_point_light_positions[16];
uniform vec4 u_point_light_color[16];

in vec2 v_texCoord;
in vec3 v_normalVector;
in vec3 v_fragPos;

out vec4 fragColor;

void main(){
	vec3 light = vec3(u_ambient_light);

	for (int i = 0; i < 16; i++){
		vec3 lightPos = u_point_light_positions[i];
		vec4 lightColor = u_point_light_color[i];

		float lightIntensity = lightColor.w;
		float lightDistance = distance(lightPos, v_fragPos);
		vec3 lightVector = normalize(lightPos - v_fragPos);
		float normalDiff = max(dot(v_normalVector, lightVector), 0.0);

		if (lightDistance < lightIntensity){
			lightIntensity = ((lightIntensity - lightDistance) / lightIntensity)  * normalDiff;
			if (lightIntensity > 0.0){
				vec3 lightAdd = vec3(lightColor.xyz) * vec3(lightIntensity);
				light += lightAdd;
			}
		}
	}
	

	fragColor = vec4(light, 1.0) * u_color * texture(u_diffuse, v_texCoord);
	if (fragColor.w == 0.0){
		discard;
	}
}