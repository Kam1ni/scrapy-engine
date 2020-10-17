#version 300 es
precision mediump float;

uniform vec3 u_point_light_position;
uniform vec4 u_point_light_intensity;

uniform sampler2D u_frag_pos;
uniform sampler2D u_normal_vector;

in vec2 tex_coord;

layout(location = 0) out vec4 lightIntensityOut;

void main(){
	ivec2 size = textureSize(u_frag_pos, 0);
	vec2 texcoord = tex_coord * vec2(size);
	ivec2 coord = ivec2(texcoord);

	vec4 fragPos4 = texelFetch(u_frag_pos, coord, 0);
	vec4 normalVector4 = texelFetch(u_normal_vector, coord, 0);

	vec3 fragPos = vec3(fragPos4.x, fragPos4.y, fragPos4.z);
	vec3 normalVector = vec3(normalVector4.x, normalVector4.y, normalVector4.z);


	vec3 lightPos = u_point_light_position;
	vec4 lightColor = u_point_light_intensity;

	float lightIntensity = lightColor.w;
	float lightDistance = distance(lightPos, fragPos);

	vec3 lightVector = normalize(lightPos - fragPos);


	float normalDiff = max(dot(normalVector, lightVector), 0.0);
	if (lightDistance < lightIntensity){
		lightIntensity = ((lightIntensity - lightDistance) / lightIntensity)  * normalDiff;
		if (lightIntensity > 0.0){
			vec3 lightAdd = vec3(lightColor.xyz) * vec3(lightIntensity);
			lightIntensityOut =  vec4(lightAdd, 1.0);
			return;
		}
	}
	lightIntensityOut = vec4(0.0,0.0,0.0,1.0);
}