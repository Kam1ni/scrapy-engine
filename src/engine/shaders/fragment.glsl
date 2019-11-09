precision mediump float;
uniform vec4 u_color;
uniform sampler2D u_diffuse;

varying vec2 v_texCoord;

void main(){
	gl_FragColor = u_color * texture2D(u_diffuse, v_texCoord);
}