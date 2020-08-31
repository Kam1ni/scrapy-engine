precision mediump float;
uniform vec4 u_color;
uniform vec3 u_ambient_light;
uniform sampler2D u_diffuse;
uniform mat4 u_projection;

uniform vec3 u_point_light_positions[16];
uniform vec4 u_point_light_color[16];

varying vec2 v_texCoord;
varying vec4 v_worldCoord;
varying vec3 v_normalVector;

void main(){
	vec3 light = vec3(u_ambient_light);
	for (int i = 0; i < 16; i++){
		vec4 lightPos = vec4(u_point_light_positions[i], 1.0);
		vec4 lightColor = u_point_light_color[i];
		float lightIntensity = lightColor.w;
		float lightDistance = distance(v_worldCoord, lightPos);
		vec4 lightVector = normalize(v_worldCoord - lightPos);
		float normalDiff = dot(lightVector, vec4(v_normalVector, 1.0));

		if (lightDistance < lightIntensity){
			lightIntensity = ((lightIntensity - lightDistance) / lightIntensity)  * normalDiff;
			//lightIntensity = normalDiff;
			if (lightIntensity > 0.0){
				vec3 lightAdd = vec3(lightColor.xyz) * vec3(lightIntensity);
				light += lightAdd;
			}
		}
	}
	

	gl_FragColor = vec4(light, 1.0) * u_color * texture2D(u_diffuse, v_texCoord);
	if (gl_FragColor.w == 0.0){
		discard;
	}
}