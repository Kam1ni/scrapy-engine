attribute vec3 a_position;

uniform mat4 u_transform;
uniform mat4 u_projection;
uniform mat4 u_offset;

void main(){
	gl_Position = u_projection * u_transform * u_offset * vec4(a_position, 1.0);
}