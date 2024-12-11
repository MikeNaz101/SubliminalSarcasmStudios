using UnityEngine;

public class StrafeAndTurn : MonoBehaviour
{
    public float mouseSensitivity = 100f; // Sensitivity for mouse input
    public Rigidbody playerRigidbody; // Reference to player's Rigidbody
    public Transform playerBody; // Reference to player's body (for rotation)
    public Transform cameraTransform; // Reference to the camera
    public float movementSpeed = 5f; // Speed of movement

    public RectTransform crosshair; // Reference to your crosshair UI element
    public float maxTurnSpeed = 100f; // Maximum turn speed at screen edge
    public float deadzoneRadius = 0.2f; // Radius of the center deadzone
    private Vector2 crosshairPosition; // Store the crosshair position

    private float xRotation = 0f; // For clamping vertical camera rotation

    void Start()
    {
        // Lock the cursor for a better experience
        Cursor.lockState = CursorLockMode.Locked;
    }

    void Update()
    {
        // --- Crosshair Movement ---

        // Get mouse input
        float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity * Time.deltaTime;
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity * Time.deltaTime;

        // Update crosshair position
        crosshairPosition += new Vector2(mouseX, mouseY);

        // Clamp crosshair position to screen bounds
        crosshairPosition.x = Mathf.Clamp(crosshairPosition.x, 0, Screen.width);
        crosshairPosition.y = Mathf.Clamp(crosshairPosition.y, 0, Screen.height);

        // Update crosshair's RectTransform position
        crosshair.position = crosshairPosition;

        // --- Crosshair-Controlled Turning ---

        // Calculate normalized screen position (0 to 1)
        Vector2 normalizedScreenPos = new Vector2(
            crosshairPosition.x / Screen.width,
            crosshairPosition.y / Screen.height
        );

        // Calculate vector from screen center to crosshair position
        Vector2 centerOffset = normalizedScreenPos - new Vector2(0.5f, 0.5f);


        // Apply deadzone
        if (centerOffset.magnitude > deadzoneRadius)
        {
            // Calculate turn speed based on distance from center
            float turnSpeed = centerOffset.magnitude * maxTurnSpeed;

            // Rotate player body on Y-axis
            playerBody.Rotate(Vector3.up * centerOffset.x * turnSpeed * Time.deltaTime);

            // Rotate camera up/down (vertical movement)
            xRotation -= centerOffset.y * turnSpeed * Time.deltaTime;
            xRotation = Mathf.Clamp(xRotation, -90f, 90f);
            cameraTransform.localRotation = Quaternion.Euler(xRotation, 0f, 0f);
        }
    }

    void FixedUpdate()
    {
        // --- Movement ---
        float moveX = Input.GetAxis("Horizontal"); // Left/Right input (strafe)
        float moveZ = Input.GetAxis("Vertical");   // Forward/Backward input

        // Calculate movement direction relative to the camera's orientation
        Vector3 moveDirection = cameraTransform.forward * moveZ + cameraTransform.right * moveX;
        moveDirection.y = 0; // Ensure movement is parallel to the ground
        moveDirection = moveDirection.normalized * movementSpeed;

        // Apply movement using Rigidbody
        Vector3 velocity = new Vector3(moveDirection.x, playerRigidbody.linearVelocity.y, moveDirection.z);
        playerRigidbody.linearVelocity = velocity;
    }
}
