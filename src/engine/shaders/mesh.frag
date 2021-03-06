#version 300 es

precision mediump float;

uniform vec4 u_color;
uniform sampler2D u_diffuse;
uniform mat4 u_projection;
uniform mat4 u_model;

in vec2 v_texCoord;
in vec3 v_normalVector;
in vec3 v_fragPos;

layout(location = 0) out vec4 fragColor;
layout(location = 1) out vec4 fragPos;
layout(location = 2) out vec4 normalVector;

void main(){
	//vec3 light = vec3(u_ambient_light);
//
	//for (int i = 0; i < 16; i++){
	//	vec3 lightPos = u_point_light_positions[i];
	//	vec4 lightColor = u_point_light_color[i];
//
	//	float lightIntensity = lightColor.w;
	//	float lightDistance = distance(lightPos, v_fragPos);
	//	vec3 lightVector = normalize(lightPos - v_fragPos);
	//	float normalDiff = max(dot(v_normalVector, lightVector), 0.0);
//
	//	if (lightDistance < lightIntensity){
	//		lightIntensity = ((lightIntensity - lightDistance) / lightIntensity)  * normalDiff;
	//		if (lightIntensity > 0.0){
	//			vec3 lightAdd = vec3(lightColor.xyz) * vec3(lightIntensity);
	//			light += lightAdd;
	//		}
	//	}
	//}
	

	vec4 color = u_color * texture(u_diffuse, v_texCoord);
	if (color.w == 0.0){
		discard;
		return;
	}
	fragColor = color;
	fragPos = vec4(v_fragPos, 1.0);
	normalVector = vec4(v_normalVector, 1.0);
}