precision mediump float;
attribute vec3 a_position;
attribute vec2 a_texCoord;


uniform mat4 u_transform;
uniform mat4 u_projection;
uniform vec2 u_uvOffset;
uniform vec2 u_uvSize;

varying vec2 v_texCoord;
varying vec4 v_worldCoord;

void main(){
	gl_Position = u_projection * u_transform * vec4(a_position, 1.0);
	v_worldCoord = u_transform * vec4(a_position, 1.0);
	v_texCoord = (a_texCoord * u_uvSize) + u_uvOffset;
}