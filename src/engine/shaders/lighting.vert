#version 300 es
precision mediump float;
in vec3 a_position;

uniform vec3 u_point_light_position;
uniform vec4 u_point_light_intensity;

out vec2 tex_coord;

void main(){
	gl_Position	= vec4(a_position, 1.0);
	tex_coord = vec2((gl_Position.x + 1.0) / 2.0, (gl_Position.y + 1.0) / 2.0);
}