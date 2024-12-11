using UnityEngine;

public class TurnAndWalk : MonoBehaviour
{
    public float mouseSensitivity = 100f; // Sensitivity of mouse movement
    public float movementSpeed = 5f; // Speed of player movement
    public Rigidbody playerRigidbody; // Reference to the player's Rigidbody

    private float turnSpeed = 200f; // Speed at which the player rotates
    private float xRotation = 0f; // Used for vertical rotation clamp

    void Start()
    {
        // Lock cursor for immersive gameplay
        Cursor.lockState = CursorLockMode.Locked;
    }

    void Update()
    {
        // --- Mouse Look ---
        float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity * Time.deltaTime;

        // Rotate the player horizontally based on mouse movement
        playerRigidbody.transform.Rotate(Vector3.up * mouseX);

        // --- Vertical Rotation ---
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity * Time.deltaTime;
        xRotation -= mouseY;
        xRotation = Mathf.Clamp(xRotation, -90f, 90f); // Clamping for vertical look
        Camera.main.transform.localRotation = Quaternion.Euler(xRotation, 0f, 0f);
    }

    void FixedUpdate()
    {
        // --- Movement ---
        float moveZ = Input.GetAxis("Vertical"); // Forward/backward input

        // Move the player in the direction they are facing
        Vector3 forwardMovement = playerRigidbody.transform.forward * moveZ * movementSpeed;
        playerRigidbody.linearVelocity = new Vector3(forwardMovement.x, playerRigidbody.linearVelocity.y, forwardMovement.z);
    }
}
