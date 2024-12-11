using UnityEngine;

public class FreezeRigidbodyRotation : MonoBehaviour
{
    void Start()
    {
        Rigidbody rb = GetComponent<Rigidbody>();
        if (rb != null)
        {
            rb.constraints = RigidbodyConstraints.FreezeRotationX| RigidbodyConstraints.FreezeRotationZ;
        }
    }
}
