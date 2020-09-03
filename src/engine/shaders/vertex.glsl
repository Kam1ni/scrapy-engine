precision mediump float;
attribute vec3 a_position;
attribute vec2 a_texCoord;
attribute vec3 a_normalVector;

uniform mat4 u_transform;
uniform mat4 u_projection;
uniform vec2 u_uvOffset;
uniform vec2 u_uvSize;
uniform vec3 u_vertexScale;

varying vec2 v_texCoord;
varying vec4 v_worldCoord;
varying vec3 v_normalVector;

void main(){
	vec3 position = u_vertexScale * a_position;
	gl_Position = u_projection * u_transform * vec4(position, 1.0);
	v_worldCoord = u_transform * vec4(position, 1.0);
	vec2 texCoord = a_texCoord;

	v_normalVector = normalize(mat3(u_transform) * a_normalVector);
	
	v_texCoord = (texCoord * u_uvSize) + u_uvOffset;
}