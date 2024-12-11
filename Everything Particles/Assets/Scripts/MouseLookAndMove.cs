using UnityEngine;

public class MouseLookAndMove : MonoBehaviour
{
    public float mouseSensitivity = 100f; // Sensitivity for mouse input
    public Transform playerBody; // Reference to the player body
    public Rigidbody playerRigidbody; // Rigidbody reference for physics-based movement
    public float movementSpeed = 5f; // Speed of movement

    private float xRotation = 0f; // For clamping vertical rotation

    void Start()
    {
        // Lock the cursor to the game window
        Cursor.lockState = CursorLockMode.Locked;
    }

    void Update()
    {
        // --- Mouse Look ---
        float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity * Time.deltaTime;
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity * Time.deltaTime;

        // Rotate camera vertically (up/down)
        xRotation -= mouseY;
        xRotation = Mathf.Clamp(xRotation, -90f, 90f); // Prevent over-rotation
        transform.localRotation = Quaternion.Euler(xRotation, 0f, 0f);

        // Rotate player body horizontally (left/right)
        playerBody.Rotate(Vector3.up * mouseX);
    }

    void FixedUpdate()
    {
        // --- Movement ---
        float moveX = Input.GetAxis("Horizontal"); // Left/Right input
        float moveZ = Input.GetAxis("Vertical");   // Forward/Backward input

        // Calculate direction relative to the camera's orientation
        Vector3 movement = (transform.forward * moveZ + transform.right * moveX).normalized * movementSpeed;

        // Apply movement using Rigidbody's velocity
        Vector3 newVelocity = new Vector3(movement.x, playerRigidbody.linearVelocity.y, movement.z);
        playerRigidbody.linearVelocity = newVelocity;
    }
}
