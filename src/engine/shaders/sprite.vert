#version 300 es

precision mediump float;
in vec3 a_position;
in vec2 a_texCoord;

uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_projection;
uniform vec2 u_uvOffset;
uniform vec2 u_uvSize;
uniform vec3 u_vertexScale;
uniform vec3 u_point_light_positions[16];

out vec2 v_texCoord;
out vec3 v_fragPos;

void main(){
	vec3 position = u_vertexScale * a_position;
	gl_Position = u_projection * inverse(u_view) * u_model * vec4(position, 1.0);
	v_fragPos = vec3(u_model * vec4(position, 1.0));
	vec2 texCoord = a_texCoord;

	v_texCoord = (texCoord * u_uvSize) + u_uvOffset;
}