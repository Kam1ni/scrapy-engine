#version 300 es

precision mediump float;

uniform vec4 u_color;
uniform mat4 u_projection;
uniform mat4 u_model;

in vec3 v_fragPos;

layout(location = 0) out vec4 fragColor;
layout(location = 1) out vec4 fragPos;
layout(location = 2) out vec4 normalVector;

void main(){
	vec4 color = u_color;
	if (color.w == 0.0){
		discard;
		return;
	}
	fragColor = color;
	fragPos = vec4(v_fragPos, 1.0);
	normalVector = vec4(1.0, 1.0, 1.0, 1.0);
}