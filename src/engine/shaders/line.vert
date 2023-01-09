#version 300 es

precision mediump float;
in vec3 a_position;

uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_projection;

out vec3 v_fragPos;

void main(){
	gl_Position = u_projection * inverse(u_view) * u_model * vec4(a_position, 1.0);
	v_fragPos = vec3(u_model * vec4(a_position, 1.0));
}