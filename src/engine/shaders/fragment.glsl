precision mediump float;
uniform vec4 u_color;
uniform vec4 u_ambient_light;
uniform sampler2D u_diffuse;

varying vec2 v_texCoord;

void main(){
	vec4 ambientLight = vec4(u_ambient_light.rgb, 1.0);
	gl_FragColor = ambientLight * u_color * texture2D(u_diffuse, v_texCoord);
	if (gl_FragColor.w == 0.0){
		discard;
	}
}