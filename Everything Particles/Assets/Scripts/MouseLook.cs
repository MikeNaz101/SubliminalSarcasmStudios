using UnityEngine;

public class MouseLook : MonoBehaviour
{
    public float mouseSensitivity = 100f; // Sensitivity of the mouse movement
    public Transform playerBody; // Reference to the player's body to rotate along with the camera
    private float xRotation = 0f; // To store and clamp the vertical rotation

    void Start()
    {
        // Lock the cursor to the game window
        Cursor.lockState = CursorLockMode.Locked;
    }

    void Update()
    {
        // Get mouse input
        float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity * Time.deltaTime;
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity * Time.deltaTime;

        // Rotate camera vertically (up and down)
        xRotation -= mouseY;
        xRotation = Mathf.Clamp(xRotation, -90f, 90f); // Prevent over-rotation

        transform.localRotation = Quaternion.Euler(xRotation, 0f, 0f);

        // Rotate the player's body horizontally (left and right)
        playerBody.Rotate(Vector3.up * mouseX);
    }
}
